import { defineField, defineType } from "sanity";

export const timelineMilestoneSchema = defineType({
  name: "timelineMilestone",
  title: "Timeline Milestone",
  type: "document",
  fields: [
    defineField({ name: "gradeLabel", title: "Grade / Year Label", type: "string", description: "e.g. Grade 9, University Year 1", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Sort Order", type: "number", validation: (r) => r.required() }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "summaryEn", title: "Summary (English)", type: "text", rows: 4 }),
    defineField({ name: "summaryAr", title: "Summary (Arabic)", type: "text", rows: 4 }),
    defineField({
      name: "linkedArticles",
      title: "Linked Articles",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
  preview: {
    select: { title: "gradeLabel", subtitle: "titleEn" },
  },
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
