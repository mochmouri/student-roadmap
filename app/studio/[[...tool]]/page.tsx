"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

// The Sanity Studio is accessible at /studio
// This route is excluded from i18n middleware via the middleware matcher
export default function StudioPage() {
  return <NextStudio config={config} />;
}
