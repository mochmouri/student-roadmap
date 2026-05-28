import { defineField, defineType } from "sanity";

export const articleSchema = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "titleEn" }, validation: (r) => r.required() }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "number",
      options: {
        list: [
          { title: "Stage 1 — Before Sixth Form", value: 1 },
          { title: "Stage 2 — Sixth Form / Pre-University", value: 2 },
          { title: "Stage 3 — University Applications", value: 3 },
          { title: "Stage 4 — University Life", value: 4 },
          { title: "Stage 5 — Building Your Future", value: 5 },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "excerptEn", title: "Excerpt (English)", type: "text", rows: 3 }),
    defineField({ name: "excerptAr", title: "Excerpt (Arabic)", type: "text", rows: 3 }),
    defineField({ name: "bodyEn", title: "Body (English)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "bodyAr", title: "Body (Arabic)", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "islamicFinanceCallout",
      title: "Show Islamic Finance Callout",
      type: "boolean",
      description: "Display the Islamic finance consideration callout in this article.",
      initialValue: false,
    }),
    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
  preview: {
    select: { title: "titleEn", stage: "stage" },
    prepare({ title, stage }) {
      return { title, subtitle: `Stage ${stage}` };
    },
  },
});
