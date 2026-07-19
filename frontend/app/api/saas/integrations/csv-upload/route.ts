import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { safeGetToken } from "@/lib/safe-auth";

export async function POST(request: Request) {
  const token = await safeGetToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const tenantId = (formData.get("tenantId") as string) || "demo-tenant-id";

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const text = await file.text();
    const lines = text.split("\n");

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    const sql = neon(process.env.DATABASE_URL!);
    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(",").map((v) => v.trim());

      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });

      const workEmail = row.work_email || row.email;
      if (!workEmail) continue;

      const ptoVal = parseFloat(row.pto_balance || row.pto_balance_remaining || "0");
      const ptoDecimal = isNaN(ptoVal) ? 0.0 : ptoVal;

      await sql`
        INSERT INTO "Employee" ("tenantId", "first_name", "last_name", "work_email", "job_title", "department", "manager_name", "pto_balance_remaining", "employment_status", "updated_at")
        VALUES (${tenantId}, ${row.first_name || ""}, ${row.last_name || ""}, ${workEmail}, ${row.job_title || "Worker"}, ${row.department || "Operations"}, ${row.manager_name || null}, ${ptoDecimal}, ${row.status || row.employment_status || "active"}, NOW())
        ON CONFLICT ("tenantId", "work_email")
        DO UPDATE SET
          "first_name" = EXCLUDED."first_name",
          "last_name" = EXCLUDED."last_name",
          "job_title" = EXCLUDED."job_title",
          "department" = EXCLUDED."department",
          "manager_name" = EXCLUDED."manager_name",
          "pto_balance_remaining" = EXCLUDED."pto_balance_remaining",
          "employment_status" = EXCLUDED."employment_status",
          "updated_at" = NOW()
      `;

      importedCount++;
    }

    return NextResponse.json({ success: true, count: importedCount }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "CSV Import Failed" }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
}
