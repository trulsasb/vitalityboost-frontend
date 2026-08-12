import { NextResponse } from "next/server";
import { readdir, mkdir } from "fs/promises";
import path from "path";
import { getAdminToken } from "@/lib/auth/adminToken";

export async function GET() {
  if (!getAdminToken()) {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const files = await readdir(uploadDir);
  return NextResponse.json({ files });
}
