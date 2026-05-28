import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteNameEn", title: "Site Name (English)", type: "string" }),
    defineField({ name: "siteNameAr", title: "Site Name (Arabic)", type: "string" }),
    defineField({ name: "taglineEn", title: "Tagline (English)", type: "string" }),
    defineField({ name: "taglineAr", title: "Tagline (Arabic)", type: "string" }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "twitter", title: "Twitter / X", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
