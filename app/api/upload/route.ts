import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getAdminToken } from "@/lib/auth/adminToken";

// Cloudflare R2 (S3-compatible object storage) -- replaces the previous
// local-filesystem write, which silently lost every uploaded image on the
// next deploy since Render's disk isn't persistent. R2 is the real,
// permanent storage layer, not a stopgap -- see the discussion that led
// here: any "temporary" fix that still wrote to local disk would have hit
// the exact same problem again at the next deploy.

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function getR2Client(): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

export async function POST(req: Request) {
  if (!getAdminToken()) {
    return NextResponse.json({ error: "Ikke innlogget som admin" }, { status: 401 });
  }

  const missingEnv = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME", "R2_PUBLIC_URL_BASE"].filter(
    (key) => !process.env[key]
  );
  if (missingEnv.length > 0) {
    return NextResponse.json(
      { error: `Fillagring er ikke konfigurert (mangler: ${missingEnv.join(", ")})` },
      { status: 503 }
    );
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

    const filename = `${Date.now()}-${randomUUID()}.${extension}`;
    const bytes = await file.arrayBuffer();

    await getR2Client().send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filename,
        Body: Buffer.from(bytes),
        ContentType: file.type,
      })
    );

    const url = `${process.env.R2_PUBLIC_URL_BASE}/${filename}`;
    return NextResponse.json({ filename, url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
