import { defineField, defineType } from "sanity";

export const islamicFinancePageSchema = defineType({
  name: "islamicFinancePage",
  title: "Islamic Finance Page",
  type: "document",
  fields: [
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "bodyEn", title: "Body (English)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "bodyAr", title: "Body (Arabic)", type: "array", of: [{ type: "block" }] }),
  ],
  preview: {
    prepare() {
      return { title: "Islamic Finance Page" };
    },
  },
});
