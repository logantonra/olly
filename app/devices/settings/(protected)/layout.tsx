"use server";
import { redirect } from "next/navigation";
import { userHasDevice } from "@/lib/db/hasDevice";
import React from "react";

export default async function SettingsGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await userHasDevice())) {
    redirect("/devices/notauthorized");
  }

  /* wrap in a fragment so we’re always returning a React element */
  return <>{children}</>;
}
