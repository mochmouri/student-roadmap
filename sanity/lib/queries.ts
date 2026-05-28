import { sanityClient } from "./client";

// Each function returns an empty result when Sanity isn't configured.

// ─── Articles ─────────────────────────────────────────────────

export async function getArticlesByStage(stage: number) {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "article" && stage == $stage] | order(publishedAt desc) {
      _id, titleEn, titleAr, excerptEn, excerptAr, slug, stage, category, authorName, publishedAt, islamicFinanceCallout
    }`,
    { stage }
  );
}

export async function getArticleBySlug(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id, titleEn, titleAr, excerptEn, excerptAr, bodyEn, bodyAr, slug, stage, category, authorName, publishedAt, islamicFinanceCallout,
      "relatedArticles": relatedArticles[]->{ _id, titleEn, titleAr, slug, stage }
    }`,
    { slug }
  );
}

export async function getFeaturedArticles(limit = 4) {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "article"] | order(publishedAt desc)[0...$limit] {
      _id, titleEn, titleAr, excerptEn, excerptAr, slug, stage, category, authorName
    }`,
    { limit }
  );
}

// ─── Blog entries ─────────────────────────────────────────────

export async function getBlogEntries() {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "blogEntry"] | order(publishedAt desc) {
      _id, title, slug, authorName, career, countryOfStudy, bio, publishedAt
    }`
  );
}

export async function getBlogEntryBySlug(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "blogEntry" && slug.current == $slug][0] {
      _id, title, slug, authorName, career, countryOfStudy, bio, publishedAt, body
    }`,
    { slug }
  );
}

// ─── Checklists ───────────────────────────────────────────────

export async function getChecklistsByStage(stage: number) {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "checklist" && stage == $stage] { _id, titleEn, titleAr, slug, items }`,
    { stage }
  );
}

export async function getChecklistBySlug(slug: string) {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "checklist" && slug.current == $slug][0] { _id, titleEn, titleAr, slug, stage, items }`,
    { slug }
  );
}

// ─── Timeline ─────────────────────────────────────────────────

export async function getTimelineMilestones() {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "timelineMilestone"] | order(order asc) {
      _id, gradeLabel, order, titleEn, titleAr, summaryEn, summaryAr,
      "linkedArticles": linkedArticles[]->{ _id, titleEn, titleAr, slug, stage }
    }`
  );
}

// ─── Resources ───────────────────────────────────────────────

export async function getResources(stage?: number, type?: string) {
  if (!sanityClient) return [];
  const stageFilter = stage ? `&& stage == ${stage}` : "";
  const typeFilter = type ? `&& type == "${type}"` : "";
  return sanityClient.fetch(
    `*[_type == "resource" ${stageFilter} ${typeFilter}] | order(_createdAt desc) {
      _id, title, type, url, description, stage, category, author
    }`
  );
}

// ─── Search ──────────────────────────────────────────────────

export async function searchContent(query: string): Promise<unknown[]> {
  if (!sanityClient) return [];
  const q = `${query}*`;
  return sanityClient.fetch<unknown[]>(
    `*[_type in ["article", "blogEntry", "resource"] && [titleEn, title, description] match $q] {
      _id, _type, "titleEn": coalesce(titleEn, title), excerptEn, description, slug, stage
    }`,
    { q }
  );
}

// ─── Islamic finance page ─────────────────────────────────────

export async function getIslamicFinancePage() {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "islamicFinancePage"][0] { titleEn, titleAr, bodyEn, bodyAr }`
  );
}
