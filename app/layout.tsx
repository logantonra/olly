import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LoginLogout } from "@/components/layout/loginLogout";
import { CloudySplash } from "@/components/splash/cloudySplash";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Olly daily dashboard",
  description: "A personalized display for your special someone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginLogout />
        <CloudySplash />
        {children}
      </body>
    </html>
  );
}
