"use client";

import TextUpload from "@/components/textUpload";
import TextRetrieve from "@/components/textRetrieve";

export default function Home() {
  return (
    <section className="flex flex-col space-y-8 items-center justify-center p-8 ">
      <h1 className="text-2xl text-center md:text-3xl lg:text-4xl font-bold mb-4 text-yellow-500">
        🚀 SharePort: Your Instant Clipboard Portal!
      </h1>

      <p className="text-gray-500 mb-8 text-center">
        ✨ Drop the hassle, grab the hustle! ✨ <br />
        Upload, share, retrieve — faster than your WiFi reconnecting!
      </p>

      <div className="flex flex-col items-center justify-center w-full">
        <TextUpload />

        <TextRetrieve />
        {/* <div className="my-6 text-center text-sm text-blue-400 font-semibold">
          🔥 Copy-Paste? That’s old news. <br /> Welcome to SharePort — where
          your clipboard goes on vacation and still works for you!
        </div> */}
      </div>
    </section>
  );
}
