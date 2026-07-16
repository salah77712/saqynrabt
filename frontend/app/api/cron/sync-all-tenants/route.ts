import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

    if (!process.env.CRON_SECRET || authHeader !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const activeIntegrations = await sql`
      SELECT * FROM "Integration"
      WHERE is_active = true AND "linked_account_token" IS NOT NULL
    `;

    let syncReports: any[] = [];

    for (const integration of activeIntegrations as any[]) {
      try {
        const mergeUrl = "https://api.merge.dev/api/hris/v1/employees";
        const response = await fetch(mergeUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.MERGE_API_KEY}`,
            "X-Account-Token": integration.linked_account_token,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const mergeData = await response.json();
          const results = mergeData.results || [];

          for (const emp of results) {
            if (!emp.work_email) continue;

            const managerName = emp.manager
              ? `${emp.manager.first_name || ""} ${emp.manager.last_name || ""}`.trim()
              : null;

            await sql`
              INSERT INTO "Employee" ("tenantId", "remote_id", "first_name", "last_name", "work_email", "job_title", "department", "manager_name", "pto_balance_remaining", "employment_status", "updated_at")
              VALUES (${integration.tenantId}, ${emp.id || null}, ${emp.first_name || ""}, ${emp.last_name || ""}, ${emp.work_email}, ${emp.job_title || "Worker"}, ${emp.department || "Operations"}, ${managerName}, ${emp.pto_balance_remaining || 0.0}, ${emp.employment_status || "active"}, NOW())
              ON CONFLICT ("tenantId", "work_email")
              DO UPDATE SET
                "remote_id" = EXCLUDED."remote_id",
                "first_name" = EXCLUDED."first_name",
                "last_name" = EXCLUDED."last_name",
                "job_title" = EXCLUDED."job_title",
                "department" = EXCLUDED."department",
                "manager_name" = EXCLUDED."manager_name",
                "pto_balance_remaining" = EXCLUDED."pto_balance_remaining",
                "employment_status" = EXCLUDED."employment_status",
                "updated_at" = NOW()
            `;
          }

          await sql`
            UPDATE "Integration" SET "last_synced_at" = NOW() WHERE id = ${integration.id}
          `;

          syncReports.push({ integrationId: integration.id, success: true, count: results.length });
        } else {
          syncReports.push({ integrationId: integration.id, success: false, error: "Merge API Error" });
        }
      } catch (err: any) {
        syncReports.push({ integrationId: integration.id, success: false, error: err.message });
      }
    }

    return NextResponse.json({ success: true, reports: syncReports });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
