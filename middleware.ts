import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n-routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip Next.js internals, static files, Sanity studio, and API routes
    "/((?!_next|studio|api|.*\\..*).*)",
  ],
};
