import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { userHasDevice } from "@/lib/db/hasDevice";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Custom daily dashboard",
  description: "A personalized display for your special someone",
};

export default async function DashGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  if (!(await userHasDevice())) {
    redirect("/devices/notauthorized");
  }
  return <>{children}</>;
}
