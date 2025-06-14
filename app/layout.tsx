import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LoginLogout } from "@/components/layout/loginLogout";
import { CloudySplash } from "@/components/splash/cloudySplash";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Olly daily dashboard",
  description: "A personalized display for your special someone",
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
        <LoginLogout signedin={!!session?.user} />
        <CloudySplash />
        {children}
      </body>
    </html>
  );
}
