import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { filename } = await req.json();

    if (!filename) {
      return NextResponse.json({ error: "Missing filename" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
