import { defineField, defineType } from "sanity";

export const checklistSchema = defineType({
  name: "checklist",
  title: "Checklist",
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
          { title: "Stage 1", value: 1 },
          { title: "Stage 2", value: 2 },
          { title: "Stage 3", value: 3 },
          { title: "Stage 4", value: 4 },
          { title: "Stage 5", value: 5 },
        ],
      },
    }),
    defineField({
      name: "items",
      title: "Checklist Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "textEn", title: "Item (English)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "textAr", title: "Item (Arabic)", type: "string" }),
          ],
          preview: { select: { title: "textEn" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "titleEn", stage: "stage" },
    prepare({ title, stage }) {
      return { title, subtitle: stage ? `Stage ${stage}` : "" };
    },
  },
});
