"use server";

import { auth } from "@/auth";


export const getUserEmail = async () => {
  const session = await auth();
  if (session ) {
    if (!session.user || !session.user.email) {
        throw new Error("User information is incomplete");
      }
    return session.user.email;
  }
};