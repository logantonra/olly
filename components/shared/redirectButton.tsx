"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface RedirectButtonProps {
  label: string;
  page: string;
  className?: string;
}

export function RedirectButton({
  label,
  page,
  className,
}: RedirectButtonProps): JSX.Element {
  const router = useRouter();

  const handleClick = () => {
    router.push(page);
  };

  return (
    <button
      className={`flex-1 rounded-xl bg-white px-6 py-5 text-lg font-semibold text-blue-500 shadow-md transition hover:bg-blue-50 hover:shadow-xl ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
RedirectButton;
