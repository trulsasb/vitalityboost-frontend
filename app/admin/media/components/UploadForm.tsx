"use client";

import { useState } from "react";

export default function UploadForm({
  onUpload,
}: {
  onUpload: (filename: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.querySelector("input[type='file']") as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    setUploading(true);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.filename) {
      onUpload(data.filename);
      form.reset();
    }
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input type="file" name="file" className="block" />
      <button
        type="submit"
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
