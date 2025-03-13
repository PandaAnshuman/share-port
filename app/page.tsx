"use client";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";

import TextUpload from "@/components/textUpload";
import TextRetrieve from "@/components/textRetrieve";

export default function Home() {
  return (
    <section className="flex flex-col w-240 space-y-5 items-center justify-center p-8 ">
      <h1 className="text-3xl font-bold mb-3">Online Clipboard</h1>
      <p className="text-gray-500 mb-8">
        Quickly upload and retrieve your text with ease
      </p>

      <div className="flex items-center justify-center w-full max-w-md">
        <TextUpload />
      </div>
      <TextRetrieve />

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
