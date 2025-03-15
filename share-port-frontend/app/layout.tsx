import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { HeartIcon } from "@/components/icons";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto my-auto  flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Snippet hideCopyButton hideSymbol variant="bordered">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-base"
                  href="https://www.linkedin.com/in/anshuman-panda-575562258/"
                  title="Anshuman's LinkedIn"
                >
                  <span className="text-default-600">Powered by</span>
                  <Code>
                    <p className="text-primary-900 font-bold">Anshuman</p>
                  </Code>
                  <HeartIcon />
                </Link>
              </Snippet>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
