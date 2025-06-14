"use server";
import { SplashPage } from "@/components/splash/splashPage";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DailyDash() {
  const session = await auth();
  if (session) {
    // If the user is authenticated, redirect to the dashboard
    redirect("/home");
  }
  return (
    <>
      <SplashPage />
    </>
  );
}
