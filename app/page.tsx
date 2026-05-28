import { redirect } from "next/navigation";

// The root URL redirects to the default locale.
// next-intl's middleware handles this, but this is a safety fallback.
export default function RootPage() {
  redirect("/en");
}
