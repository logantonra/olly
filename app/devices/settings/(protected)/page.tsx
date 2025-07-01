"use server";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserSettings } from "@/lib/db/userPrefs";
import { MapPin, Train, ChevronRight } from "lucide-react";

// Email is gauranteed to be present in the session given we only use google for auth
type LoggedIn = NonNullable<Awaited<ReturnType<typeof auth>>> & {
  user: { email: string };
};

export default async function SettingsHome() {
  const session = (await auth()) as LoggedIn | null;
  if (!session) redirect("/");

  const settings = await getUserSettings(session.user.email);
  if (!settings)
    return (
      <PageShell>
        <p className="text-center text-lg opacity-80">
          No settings found. Pleaase log out and in again. If the issue
          persists, contact support
        </p>
      </PageShell>
    );

  const [s0, s1] = settings.stations ?? [];

  return (
    <PageShell>
      <SettingsCard
        href="settings/location"
        icon={<MapPin className="h-6 w-6" />}
      >
        <p className="font-medium">Location</p>
        <p className="text-sm opacity-80">{settings.location.city}</p>
      </SettingsCard>

      <SettingsCard
        href="settings/stations"
        icon={<Train className="h-6 w-6" />}
      >
        <p className="font-medium">Subway Stations</p>
        {s0 && (
          <p className="text-sm opacity-80">
            {s0.name}, {s0.direction}
          </p>
        )}
        {s1 && (
          <p className="text-sm opacity-80">
            {s1.name}, {s1.direction}
          </p>
        )}
      </SettingsCard>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 text-white">
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
        <h2 className="mb-6 text-center text-3xl font-semibold">Settings</h2>
        {children}
      </div>
    </div>
  );
}

function SettingsCard({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="bg-white/15 group mb-4 flex items-center justify-between rounded-2xl px-5 py-4 last:mb-0 hover:bg-white/25"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>{children}</div>
      </div>
      <ChevronRight className="h-5 w-5 opacity-60 transition group-hover:translate-x-1" />
    </Link>
  );
}
