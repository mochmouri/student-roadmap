import type { NextAuthConfig } from "next-auth";
import Resend from "next-auth/providers/resend";

export const authConfig = {
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.AUTH_RESEND_FROM ?? "noreply@example.com",
    }),
  ],
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
    error: "/sign-in",
  },
  callbacks: {
    session({ session, user }) {
      session.user.isPremium = (user as { isPremium?: boolean }).isPremium ?? false;
      session.user.hasBundle = (user as { hasBundle?: boolean }).hasBundle ?? false;
      return session;
    },
  },
} satisfies NextAuthConfig;
