import type React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { userHasDevice } from "@/lib/db/hasDevice";

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
