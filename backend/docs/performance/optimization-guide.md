# SAQYN RABT — Advanced Performance Optimization Guide

This guide details the front-end performance strategy to target high Lighthouse audit scores (>95 Desktop, >85 Mobile).

## 1. Metric Targets
- **Largest Contentful Paint (LCP):** < 2.5 seconds.
- **First Input Delay (FID):** < 100 ms (or Interaction to Next Paint < 200 ms).
- **Cumulative Layout Shift (CLS):** < 0.1.

## 2. Image Optimization (R2 + Cloudflare CDN)
- All static assets must use Next.js `next/image` with auto-webp format conversion.
- Dynamic guest files uploaded to Cloudflare R2 are resized on the edge via Cloudflare Images resizing endpoints.
- Lazy-loading is forced (`loading="lazy"`) except for above-the-fold hero images, which use `priority`.

## 3. Script Splitting & Deferral
- Dynamic imports (`next/dynamic`) are configured for heavy client modules like `SearchOverlay` and `GuidedTour` to strip initial bundle sizes.
- Critical external scripts are preloaded using `preconnect`.

## 4. Cache Policies
- **Static Assets:** `Cache-Control: public, max-age=31536000, immutable`.
- **API Queries:** Upstash Redis is implemented for transient values (branding configs, member list permissions) with automated event cache invalidation.
