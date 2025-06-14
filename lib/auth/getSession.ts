"use server";

import { auth } from "@/auth";


export const getUserName = async () => {
  const session = await auth();
  if (session ) {
    if (!session.user || !session.user.email) {
        throw new Error("User information is incomplete");
      }
    return session.user.name?.split(" ")[0] || session.user.email.split("@")[0] || session.user.name ;
  }
};