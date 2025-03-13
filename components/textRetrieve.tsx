"use client";
import React, { useState } from "react";
import pb from "@/utils/backend";
import { InputOtp, Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

const TextRetrieve = () => {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");

  const handleFetch = async () => {
    if (!code.trim()) {
      addToast({
        title: "Invalid Code",
        description: "Please enter a valid 4-digit code.",
        color: "warning",
      });
      return;
    }
    try {
      const resultList = await pb.collection("texts").getList(1, 50, {
        filter: `clipId = \"${code}\"`,
      });

      if (resultList.items.length > 0) {
        setText(resultList.items[0].text);
        console.log("✅ Fetched Data:", resultList.items[0].text);
      } else {
        addToast({
          title: "No Data Found",
          description: "No text associated with this code.",
          color: "warning",
        });
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      addToast({
        title: "Error Fetching Data",
        description: "Something went wrong. Please try again.",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <InputOtp
        length={4}
        value={code}
        onValueChange={setCode}
        placeholder="Enter code"
      />
      <Button
        color="warning"
        variant="shadow"
        onPress={handleFetch}
        className="w-full max-w-xs"
      >
        Fetch
      </Button>
      <Textarea
        isReadOnly
        className="max-w-xs mt-4"
        value={text}
        label="Fetched Text"
        labelPlacement="outside"
        placeholder="Your fetched content will appear here"
        variant="bordered"
      />
    </div>
  );
};

export default TextRetrieve;
