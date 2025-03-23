import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { addToast } from "@heroui/toast";
import pb from "@/utils/backend";

interface FileItem {
  file: File;
  name: string;
  size: number;
  type: string;
}

export default function DragDropUpload() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successID, setSuccessID] = useState<string | undefined>();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    try {
      const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    } catch (error) {
      console.error("Error processing dropped files:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFiles = e.target.files
        ? Array.from(e.target.files).map((file) => ({
            file: file,
            name: file.name,
            size: file.size,
            type: file.type,
          }))
        : [];
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } catch (error) {
      console.error("Error processing selected files:", error);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.warn("No files to upload!");
      addToast({
        title: "Nothing to Upload",
        description: "Please select files to upload.",
        color: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      // Generate a unique clipId
      const clipId = Math.floor(1000 + Math.random() * 9000).toString();

      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append("clipId", clipId);

      // Append the first file to the formData
      // Based on your schema, it appears you're storing a single file
      formData.append("file", files[0].file);

      // Create the record with the file
      const record = await pb.collection("files").create(formData);

      console.log("Upload successful:", record);
      setSuccessID(record.clipId);
      setFiles([]);

      addToast({
        title: "File Uploaded Successfully!",
        description: `Your file upload ID: ${record.clipId}`,
        color: "success",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      addToast({
        title: "Upload Failed",
        description: "An error occurred. Please try again.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div
        className={`border-2 border-dashed p-6 rounded-lg ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <UploadCloud className="h-12 w-12 text-blue-500" />
            <p className="text-gray-700">
              Drag & Drop files here or click to upload
            </p>
          </div>
        </label>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Selected Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <div className="truncate text-black max-w-xs">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <X
                  className="h-5 w-5 text-red-500 cursor-pointer"
                  onClick={() => removeFile(index)}
                />
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-4 py-2 px-4 rounded-lg w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      )}

      {successID && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            <span className="font-semibold">Success!</span> Your file ID is:{" "}
            {successID}
          </p>
        </div>
      )}
    </div>
  );
}
