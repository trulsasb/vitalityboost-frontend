"use client";

import { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import MediaGrid from "./components/MediaGrid";

export default function MediaPage() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => setFiles([]));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Media Library</h1>

      <UploadForm
        onUpload={(file) => setFiles((prev) => [...prev, file])}
      />

      <MediaGrid
        files={files}
        onDelete={(file) =>
          setFiles((prev) => prev.filter((f) => f !== file))
        }
      />
    </div>
  );
}
