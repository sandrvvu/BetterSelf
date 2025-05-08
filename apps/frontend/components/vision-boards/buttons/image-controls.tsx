"use client";

import { Trash, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  isDeleteMode: boolean;
  onToggleDeleteMode: () => void;
  boardId: string;
  uploadImage: ({ id, file }: { id: string; file: File }) => Promise<unknown>;
}

export const ImageControls = ({
  isDeleteMode,
  onToggleDeleteMode,
  boardId,
  uploadImage,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadImage({ id: boardId, file });
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={isDeleteMode ? "secondary" : "outline"}
        onClick={onToggleDeleteMode}
      >
        {isDeleteMode ? (
          <>
            <X className="w-4 h-4 mr-1" />
            Cancel Delete
          </>
        ) : (
          <>
            <Trash className="w-4 h-4 mr-1" />
            Delete Images
          </>
        )}
      </Button>

      <Button onClick={handleUploadClick} disabled={uploading}>
        <Upload className="w-4 h-4 mr-1" />
        {uploading ? "Uploading..." : "Add Image"}
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(event) => {
          event.preventDefault();
          void handleImageChange(event);
        }}
        className="hidden"
      />
    </div>
  );
};
