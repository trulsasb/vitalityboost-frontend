import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Mangler URL" }, { status: 400 });
    }

    const filename = url.replace("/uploads/", "");
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await unlink(filePath);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Kunne ikke slette fil" }, { status: 500 });
  }
}
