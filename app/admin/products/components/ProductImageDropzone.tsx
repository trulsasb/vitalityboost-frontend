"use client";

type ProductImageDropzoneProps = {
  onFiles: (files: FileList) => void;
};

export default function ProductImageDropzone({ onFiles }: ProductImageDropzoneProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) onFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-400 rounded p-6 text-center cursor-pointer"
    >
      <p className="text-gray-600">Dra bilder hit</p>
    </div>
  );
}
