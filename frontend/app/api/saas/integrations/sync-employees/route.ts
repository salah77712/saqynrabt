import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const { token, tenantId } = await request.json();

    if (!token || !tenantId) {
      return NextResponse.json({ message: "Missing token or tenantId" }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const tenants = await sql`
      SELECT id, plan_tier FROM "Tenant" WHERE id = ${tenantId}
    `;
    const tenant = tenants[0] as { id: string; plan_tier: string } | undefined;

    if (!tenant) {
      return NextResponse.json({ message: "Tenant not found" }, { status: 404 });
    }

    const countResult = await sql`
      SELECT COUNT(*)::int AS count FROM "Employee" WHERE "tenantId" = ${tenantId}
    `;
    const currentCount = (countResult[0] as { count: number }).count;

    const mergeUrl = "https://api.merge.dev/api/hris/v1/employees";
    const response = await fetch(mergeUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MERGE_API_KEY}`,
        "X-Account-Token": token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return NextResponse.json({ message: `Merge API Error: ${errorMsg}` }, { status: response.status });
    }

    const mergeData = await response.json();
    const results = mergeData.results || [];

    const incomingCount = results.length;
    if (tenant.plan_tier !== "Enterprise" && currentCount + incomingCount > 150) {
      return NextResponse.json(
        { message: "Please upgrade to Enterprise to manage >150 employees." },
        { status: 403 }
      );
    }

    let upsertCount = 0;
    for (const emp of results) {
      if (!emp.work_email) continue;

      const managerName = emp.manager
        ? `${emp.manager.first_name || ""} ${emp.manager.last_name || ""}`.trim()
        : null;

      await sql`
        INSERT INTO "Employee" ("tenantId", "remote_id", "first_name", "last_name", "work_email", "job_title", "department", "manager_name", "pto_balance_remaining", "employment_status", "updated_at")
        VALUES (${tenantId}, ${emp.id || null}, ${emp.first_name || ""}, ${emp.last_name || ""}, ${emp.work_email}, ${emp.job_title || "Worker"}, ${emp.department || "Operations"}, ${managerName}, ${emp.pto_balance_remaining || 0.0}, ${emp.employment_status || "active"}, NOW())
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

      upsertCount++;
    }

    await sql`
      INSERT INTO "Integration" ("id", "tenantId", "provider_name", "linked_account_token", "is_active", "last_synced_at")
      VALUES (${tenantId}, ${tenantId}, 'Merge', ${token}, true, NOW())
      ON CONFLICT ("id")
      DO UPDATE SET
        "last_synced_at" = NOW(),
        "is_active" = true
    `;

    return NextResponse.json({ success: true, count: upsertCount });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
