import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getAdminToken } from "@/lib/auth/adminToken";

// NOTE: this writes to the local filesystem, which does not persist across
// deploys/restarts on Render's free plan (no persistent disk in render.yaml).
// Uploaded images will be lost on the next deploy until storage is moved to
// something durable (e.g. S3-compatible object storage).

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  if (!getAdminToken()) {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Max size is 5MB" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    const filePath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({ filename, url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
