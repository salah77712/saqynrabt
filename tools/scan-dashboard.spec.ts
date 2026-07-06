// tools/scan-dashboard.spec.ts
import { test } from '@playwright/test';
import fs from 'fs';

const BASE = process.env.BASE_URL ?? 'https://saqynrabt.com';
const PAGES = [
  '/dashboard/automation',
  '/dashboard',
  '/dashboard/chat',
  '/dashboard/documents',
  '/dashboard/team',
  '/settings',
  '/sign-in'
];

type RecordItem = {
  page: string;
  url: string;
  screenshot: string | null;
  consoleErrors: string[];
  networkFailures: { url: string; status?: number; error?: string }[];
  clicked: { selector: string; result: 'ok'|'error'|'skipped'; error?: string }[];
};

const results: RecordItem[] = [];

test.describe('Full dashboard button scan', () => {
  for (const path of PAGES) {
    test(`scan ${path}`, async ({ page }) => {
      const url = new URL(path, BASE).toString();
      const consoleErrors: string[] = [];
      const networkFailures: { url: string; status?: number; error?: string }[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      page.on('response', resp => {
        if (resp.status() >= 400) {
          networkFailures.push({ url: resp.url(), status: resp.status() });
        }
      });

      page.on('requestfailed', req => {
        networkFailures.push({ url: req.url(), error: req.failure()?.errorText });
      });

      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(()=>{});
      const safeName = path.replace(/\W+/g, '_').replace(/^_+|_+$/g, '');
      const screenshotDir = 'scan-results/screenshots';
      fs.mkdirSync(screenshotDir, { recursive: true });
      const screenshotPath = `${screenshotDir}/${safeName}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(()=>{});

      const clickable = await page.$$eval(
        'button, [role="button"], a[href]:not([href^="mailto:"])',
        els => els.map((el, i) => {
          const text = (el.textContent || '').trim().slice(0, 120);
          const sel = el.getAttribute('data-test-id') || el.id || el.className || `el-${i}`;
          return { text, selector: sel };
        })
      ).catch(()=>[]);

      const clicked = [];
      for (const item of clickable.slice(0, 40)) {
        try {
          if (item.text) {
            await page.locator(`text="${item.text}"`).first().click({ timeout: 5000 }).catch(async () => {
              await page.locator('button, [role="button"], a[href]').first().click({ timeout: 5000 });
            });
          } else {
            await page.locator('button, [role="button"], a[href]').first().click({ timeout: 5000 });
          }
          await page.waitForTimeout(800);
          clicked.push({ selector: item.selector, result: 'ok' });
        } catch (err: any) {
          clicked.push({ selector: item.selector, result: 'error', error: err?.message ?? String(err) });
        }
      }

      results.push({
        page: path,
        url,
        screenshot: screenshotPath,
        consoleErrors: [...consoleErrors],
        networkFailures: [...networkFailures],
        clicked
      });

      fs.writeFileSync('scan-results/partial-results.json', JSON.stringify(results, null, 2));
    });
  }

  test.afterAll(async () => {
    fs.writeFileSync('scan-results/results.json', JSON.stringify(results, null, 2));
    console.log('Scan complete. Results written to scan-results/results.json');
  });
});
