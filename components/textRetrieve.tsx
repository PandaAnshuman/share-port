"use client";

import React, { useState } from "react";
import pb from "@/utils/backend";
import { InputOtp, Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Copy } from "lucide-react"; // Icon for copy button

const TextRetrieve = () => {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

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
    try {
      const resultList = await pb.collection("texts").getList(1, 50, {
        filter: `clipId = "${code}"`,
      });

      if (resultList.items.length > 0) {
        setText(resultList.items[0].text);
        setNotFound(false);
        console.log("✅ Fetched Data:", resultList.items[0].text);
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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Copy to Clipboard Function
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      addToast({
        title: "Copied!",
        description: "Your text has been copied to clipboard.",
        color: "success",
      });
    } catch (error) {
      console.error("❌ Copy failed:", error);
      addToast({
        title: "Copy Failed",
        description: "Unable to copy text. Try again.",
        color: "danger",
      });
    }
  };

  // Handle Form Submission (Fix for Enter Key)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      handleFetch();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg mt-10 font-semibold mb-2 text-purple-500">
          ✨ Got a code? Let’s retrieve your content!
        </h3>
        <p className="text-sm text-gray-500">
          Enter the 4-digit code you received to instantly fetch your saved
          text. No passwords, no fuss — just magic! 🔥
        </p>
      </div>

      {/* Wrap InputOtp and Button inside a Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
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
          type="submit" // Ensures Enter triggers the fetch
          color="primary"
          variant="shadow"
          className="w-full md:w-1/2 lg:w-1/3 py-2 text-lg font-medium mt-4"
        >
          {loading ? "Retrieving..." : "Retrieve Text"}
        </Button>
      </form>

      {text.length > 0 && (
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          <Textarea
            isReadOnly
            className="mt-4 w-full text-sm pr-12 rounded-lg"
            value={text}
            label="Fetched Text"
            labelPlacement="outside"
            placeholder="Your fetched content will appear here"
            variant="bordered"
          />
          {/* Floating Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-gray-300 hover:bg-gray-200 text-gray-700 p-2 rounded-lg shadow-md transition-all"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      )}

      {notFound && (
        <p className="text-sm text-red-400">
          🛑 No treasure found! Double-check your code!
        </p>
      )}
    </div>
  );
};

export default TextRetrieve;
