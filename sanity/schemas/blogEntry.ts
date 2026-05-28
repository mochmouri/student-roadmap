import { defineField, defineType } from "sanity";

export const blogEntrySchema = defineType({
  name: "blogEntry",
  title: "Blog Entry — Day in the Life",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "authorName", title: "Author Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "career", title: "Career / Field", type: "string", validation: (r) => r.required() }),
    defineField({ name: "countryOfStudy", title: "Country of Study", type: "string" }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "career" },
  },
});
