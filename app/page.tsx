"use server";
import { SplashPage } from "@/components/splash/splashPage";
import { auth } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function DailyDash() {
  const user = await auth();
  if (user) {
    // If the user is authenticated, redirect to the dashboard
    redirect("/home");
  }
  return (
    <>
      <SplashPage />
    </>
  );
}
