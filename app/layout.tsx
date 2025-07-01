import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LoginLogout, BackButton } from "@/components/layout";
import { CloudySplash } from "@/components/splash/cloudySplash";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Olly",
  description:
    "Create a stunning smart dashboard using Raspberry Pi and a 1920x480 display. Show live NYC subway times, real-time weather, and rotating personal messages in a sleek, touchscreen interface. Built as a heartfelt gift, this DIY project blends utility and charm.",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.svg", type: "image/svg+xml" },
      {
        rel: "icon",
        url: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <BackButton></BackButton>
        <LoginLogout signedin={!!session?.user} />
        <CloudySplash />
        {children}
      </body>
    </html>
  );
}
