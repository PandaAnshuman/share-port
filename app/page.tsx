"use client";

import TextUpload from "@/components/textUpload";
import TextRetrieve from "@/components/textRetrieve";
import FileUpload from "@/components/fileUpload";
import FileRetrieve from "@/components/fileRetrieve";
import { useState } from "react";
import { Button } from "@heroui/button";

export default function Home() {
  const [switchToFile, setswitchToFile] = useState(false);
  const [switchToText, setswitchToText] = useState(false);
  return (
    <section className="flex flex-col space-y-8 items-center justify-center p-8 ">
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 text-yellow-500">
        🚀 SharePort: Your Ultimate Clipboard & File Sharing Portal!
      </h1>

      <p className="text-gray-500 mb-8 text-center">
        ✨ No more hassle, only hustle! ✨ <br />
        Instantly upload, share, and retrieve text and files — faster than your
        WiFi reconnects!
      </p>

      {switchToFile ? (
        <Button
          onPress={(e) => (setswitchToText(true), setswitchToFile(false))}
        >
          Switch to Text
        </Button>
      ) : (
        <Button
          onPress={(e) => (setswitchToFile(true), setswitchToText(false))}
        >
          Switch to Files
        </Button>
      )}

      {switchToFile ? (
        <div className="flex flex-col items-center justify-center w-full">
          {/* <TextUpload /> */}
          <FileUpload />
          {/* <TextRetrieve /> */}
          <FileRetrieve />
          {/* <div className="my-6 text-center text-sm text-blue-400 font-semibold">
          🔥 Copy-Paste? That’s old news. <br /> Welcome to SharePort — where
          your clipboard goes on vacation and still works for you!
        </div> */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <TextUpload />

          <TextRetrieve />

          {/* <div className="my-6 text-center text-sm text-blue-400 font-semibold">
            🔥 Copy-Paste? That’s old news. <br /> Welcome to SharePort — where
            your clipboard goes on vacation and still works for you!
          </div> */}
        </div>
      )}
    </section>
  );
}
