"use client";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Textarea } from "@heroui/input";
import React from "react";
import { addToast } from "@heroui/toast";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_BACKEND_API);
const TextUpload = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [successID, setSuccessID] = useState();

  const handleUpload = async () => {
    if (!text.trim()) {
      addToast({
        title: "Nothing to Upload",
        description: "Please enter some text to upload.",
        color: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const clipId = Math.floor(1000 + Math.random() * 9000).toString();
      const data = { text, clipId };

      const record = await pb.collection("texts").create(data);
      console.log(record);
      setSuccessID(record?.clipId);

      addToast({
        title: "Text Uploaded Successfully!",
        description: `Your text upload ID: ${clipId}`,
        color: "success",
      });
    } catch (error) {
      console.error("Error uploading text:", error);
      addToast({
        title: "Upload Failed",
        description: "An error occurred. Please try again.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        ✏️ Upload Your Text — No USB Required!
      </h2>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        isClearable
        className="w-full max-w-3xl min-h-32"
        label="Your Text"
        placeholder="Paste or type your text here..."
        variant="bordered"
        onClear={() => setText("")}
      />

      <Button
        color="primary"
        variant="shadow"
        onPress={handleUpload}
        isLoading={loading}
        className="w-full md:w-1/2 lg:w-1/3 py-2 text-lg font-medium"
      >
        {loading ? "Uploading..." : "Upload Text"}
      </Button>
      {successID && (
        <p className="text-sm text-gray-500">
          ✅ Your text is safe and sound! Share this ID:
          <span className="font-semibold text-green-500">{successID}</span>
        </p>
      )}
    </div>
  );
};

export default TextUpload;
