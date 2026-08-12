import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";
import { getAdminToken } from "@/lib/auth/adminToken";

export async function POST(req: Request) {
  if (!getAdminToken()) {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  try {
    const { filename } = await req.json();

    if (!filename || typeof filename !== "string") {
      return NextResponse.json({ error: "Missing filename" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    // path.basename strips any directory components (e.g. "../../etc/passwd")
    // so the resolved path can never escape uploadDir.
    const safeName = path.basename(filename);
    const filePath = path.join(uploadDir, safeName);

    if (path.dirname(filePath) !== uploadDir) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
