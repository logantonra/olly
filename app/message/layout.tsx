"use server";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "@/auth";

export default async function MessageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return <>{children}</>;
}
