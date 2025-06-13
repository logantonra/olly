"use client";
import { WeatherBackground } from "@/components/dailydash/weatherBackground";
import { CloudySplash } from "@/components/splash/cloudySplash";
import { SplashPage } from "@/components/splash/splashPage";
import { SubwayDisplay } from "@/components/dailydash/subwayDisplay";
import { TimeDisplay } from "@/components/dailydash/timeDisplay";
import { MessagesDisplay } from "@/components/dailydash/messageDisplay";

export default function DailyDash() {
  return (
    <>
      <CloudySplash />
      <SplashPage
        onSignUp={() => console.log("Sign up clicked")}
        onSignIn={() => console.log("Sign in clicked")}
      />
    </>
  );
}
