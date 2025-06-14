"use server"

import { signOut } from "@/auth"

export async function signOutGoogle() {
  await signOut()
}