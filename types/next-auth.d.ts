import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isPremium: boolean;
      hasBundle: boolean;
    } & DefaultSession["user"];
  }
  interface User {
    isPremium?: boolean;
    hasBundle?: boolean;
    lsCustomerId?: string;
  }
}
