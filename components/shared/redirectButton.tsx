"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  label: string;
  page: string;
  className?: string;
  icon?: React.ReactNode; // Optional icon prop
}

export function RedirectButton({
  label,
  page,
  className,
  icon,
}: RedirectButtonProps): JSX.Element {
  const router = useRouter();

  const handleClick = () => {
    router.push(page);
  };

  return (
    <button
      className={`flex flex-1 items-center rounded-xl bg-white px-6 py-5 text-lg font-semibold text-blue-500 shadow-md transition hover:bg-blue-50 hover:shadow-xl ${className}`}
      onClick={handleClick}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {label}
    </button>
  );
}
