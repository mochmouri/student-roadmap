import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "The Student Roadmap",
  schema: { types: schemaTypes },
  // Note: @sanity/vision (GROQ explorer) requires React 19 which conflicts with Next.js 14.
  // Add it back once you upgrade to Next.js 15 / React 19.
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Articles").schemaType("article").child(S.documentTypeList("article")),
            S.listItem().title("Blog Entries").schemaType("blogEntry").child(S.documentTypeList("blogEntry")),
            S.listItem().title("Checklists").schemaType("checklist").child(S.documentTypeList("checklist")),
            S.listItem().title("Timeline Milestones").schemaType("timelineMilestone").child(S.documentTypeList("timelineMilestone")),
            S.listItem().title("Resources").schemaType("resource").child(S.documentTypeList("resource")),
            S.divider(),
            // Singletons
            S.listItem()
              .title("Islamic Finance Page")
              .id("islamicFinancePage")
              .child(S.document().schemaType("islamicFinancePage").documentId("islamicFinancePage")),
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
  ],
});
