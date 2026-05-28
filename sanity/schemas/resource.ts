import { defineField, defineType } from "sanity";

export const resourceSchema = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "Article", value: "article" },
          { title: "Video", value: "video" },
          { title: "Podcast", value: "podcast" },
          { title: "Other", value: "other" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
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
          { title: "All stages", value: 0 },
        ],
      },
    }),
    defineField({ name: "category", title: "Category", type: "string", description: "e.g. Study skills, Finance, Wellbeing" }),
    defineField({ name: "author", title: "Author / Creator", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
});
