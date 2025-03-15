"use client";

import React, { useState } from "react";
import pb from "@/utils/backend";
import { InputOtp, Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

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
      >
        {loading ? "Retrieving..." : "Retrieve Text"}
      </Button>

      {text.length > 0 ? (
        <Textarea
          isReadOnly
          className="mt-4 w-full text-sm"
          value={text}
          label="Fetched Text"
          labelPlacement="outside"
          placeholder="Your fetched content will appear here"
          variant="bordered"
        />
      ) : (
        <></>
      )}
      {notFound ? (
        <p className="text-sm text-red-400">
          🛑 No treasure found! Double-check your code!
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextRetrieve;
