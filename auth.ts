import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./prisma/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {},
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
