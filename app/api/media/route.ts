import { NextResponse } from "next/server";
import { readdir, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const files = await readdir(uploadDir);
  return NextResponse.json({ files });
}
