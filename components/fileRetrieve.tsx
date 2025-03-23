"use client";
import React, { useState } from "react";
import pb from "@/utils/backend";
import { InputOtp, Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Download } from "lucide-react";

const FileRetrieve = () => {
  const [code, setCode] = useState("");
  const [fileData, setFileData] = useState<{
    url: string;
    filename: string;
    size: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleFetch = async () => {
    if (!code.trim()) {
      addToast({
        title: "Invalid Code",
        description: "Please enter a valid 4-digit code.",
        color: "warning",
      });
      return;
    }

    setLoading(true);
    setNotFound(false);
    setFileData(null);

    try {
      const resultList = await pb.collection("files").getList(1, 1, {
        filter: `clipId = "${code}"`,
      });

      if (resultList.items.length > 0) {
        const record = resultList.items[0];

        // Check if the file exists
        if (record.file) {
          // Construct the file URL
          const fileName = record.file;
          const fileUrl = pb.files.getUrl(record, fileName);

          // Get file metadata if available
          let fileSize = 0;
          if (
            record.file &&
            typeof record.file === "object" &&
            "size" in record.file
          ) {
            fileSize = record.file.size;
          }

          setFileData({
            url: fileUrl,
            filename: fileName,
            size: fileSize,
          });

          console.log("✅ Fetched File:", fileUrl);
        } else {
          addToast({
            title: "No File Found",
            description: "The record exists but contains no file.",
            color: "warning",
          });
        }
      } else {
        addToast({
          title: "Oops!",
          description: "Please enter a valid code.",
          color: "danger",
        });
        setNotFound(true);
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      addToast({
        title: "Error Fetching Data",
        description: "Something went wrong. Please try again.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!fileData?.url) return;

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileData.url;
    link.target = "_blank";
    link.download = fileData.filename || "downloaded-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: "Download Started",
      description: "Your file download has begun.",
      color: "success",
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg mt-10 font-semibold mb-2 text-purple-500">
          ✨ Got a code? Let's retrieve your file!
        </h3>
        <p className="text-sm text-gray-500">
          Enter the 4-digit code you received to instantly fetch your saved
          file. No passwords, no fuss — just magic! 🔥
        </p>
      </div>

      <InputOtp
        length={4}
        value={code}
        onValueChange={setCode}
        placeholder="Enter code"
        className="text-lg"
        size="lg"
        color="warning"
      />

      <Button
        color="primary"
        variant="shadow"
        onPress={handleFetch}
        className="w-full md:w-1/2 lg:w-1/3 py-2 text-lg font-medium"
        disabled={loading}
      >
        {loading ? "Retrieving..." : "Retrieve File"}
      </Button>

      {fileData && (
        <div className="mt-6 w-full max-w-lg border rounded-lg p-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">
                {fileData.filename || "File"}
              </h4>
              {fileData.size > 0 && (
                <p className="text-sm text-blue-600">
                  {formatFileSize(fileData.size)}
                </p>
              )}
            </div>
            <Button
              color="primary"
              variant="solid"
              onPress={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>
      )}

      {notFound && (
        <p className="text-sm text-red-400">
          🛑 No file found! Double-check your code!
        </p>
      )}
    </div>
  );
};

export default FileRetrieve;
