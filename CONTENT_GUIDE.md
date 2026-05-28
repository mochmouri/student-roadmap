# Content Guide

How to add and edit content on this site. You don't need to touch any code.

---

## Getting started

All content is managed through the **Sanity Studio** — a visual editing interface.

1. Make sure the site is running locally (`npm run dev`)
2. Open your browser and go to: **http://localhost:3000/studio**
3. Sign in with your Sanity account (same account used when creating the project)

If the Studio shows an error about a missing project ID, add your credentials to `.env.local` (see the `.env.local.example` file for the format).

---

## Content types

### Articles

These are the main guide entries — the practical, honest pieces written for students.

Each article has:
- **Title (English / Arabic)** — the heading shown on the site
- **Slug** — the URL-friendly identifier (auto-generated from the title, don't change after publishing)
- **Stage** — which of the five stages this belongs to (1–5)
- **Category** — e.g. "Study Skills", "Applications", "Finance"
- **Author Name** — who wrote it
- **Published At** — date shown to readers
- **Excerpt** — a short summary (2–3 sentences) shown on listing pages
- **Body (English / Arabic)** — the full article content, written in a rich text editor
- **Show Islamic Finance Callout** — tick this if the article covers student finance topics
- **Related Articles** — link to other articles shown in the sidebar

**To add a new article:**
1. In the Studio sidebar, click "Articles"
2. Click the "+" button (top right or "Create new")
3. Fill in the fields. At minimum: Title, Slug, Stage, Body
4. Click "Publish" when ready

---

### Blog Entries — Day in the Life

First-person posts from people in different careers, describing their university path and a typical day at work.

Each entry has:
- **Title** — e.g. "Medicine in the UK: What Nobody Told Me"
- **Slug** — auto-generated URL identifier
- **Author Name** — the person's name
- **Career / Field** — e.g. "Junior Doctor", "Architect"
- **Country of Study** — where they studied
- **Short Bio** — 2–3 sentences about the author
- **Published At** — date
- **Body** — the full post

**To add a new entry:**
1. Click "Blog Entries" in the sidebar
2. Create new, fill in, publish

---

### Checklists

Interactive checklists that readers can tick off (progress is saved in their browser).

Each checklist has:
- **Title (English / Arabic)**
- **Stage** — which stage it belongs to
- **Items** — a list of tasks, each with English and Arabic text

**To add checklist items:**
1. Open the checklist
2. Click "Add item" in the Items section
3. Type the item text in English (and Arabic if translating)
4. Publish

---

### Timeline Milestones

The interactive roadmap on the /roadmap page. There are 8 milestones (Grade 9 through Graduation).

Each milestone has:
- **Grade / Year Label** — e.g. "Grade 9", "University Year 1"
- **Sort Order** — determines the order they appear (1 = first)
- **Title (English / Arabic)**
- **Summary (English / Arabic)** — what to focus on at this stage
- **Linked Articles** — articles that appear when a reader clicks the milestone

---

### Resources

The filterable library of books, videos, podcasts, and articles.

Each resource has:
- **Title**
- **Type** — Book, Article, Video, Podcast, or Other
- **URL** — the link readers click to visit the resource
- **Description** — a short note on why it's worth their time
- **Stage** — which stage it's most relevant to (use 0 for "All stages")
- **Category** — e.g. "Study Skills", "Finance", "Career"
- **Author / Creator**

---

### Islamic Finance Page

A single page (one document) with guidance on Islamic finance considerations.

Edit it by clicking "Islamic Finance Page" in the Studio sidebar. It has English and Arabic body fields.

---

### Site Settings

Update the site name, tagline, author name, and social links here.

---

## Writing tips

- Write like you're talking to a smart 17-year-old. Direct, honest, no jargon.
- Avoid institutional language ("it is recommended that students…"). Say "you should" or "do this".
- Specific is better than general. "Go to at least one office hour in your first three weeks" beats "make use of academic resources".
- When covering student finance, tick the **Islamic Finance Callout** checkbox — this adds a clearly labelled note for readers approaching the topic from an Islamic perspective.

---

## Translating content

Every article, checklist, and page has separate English and Arabic fields. You don't have to translate everything immediately — the site shows English as a fallback if Arabic isn't filled in.

If you're adding Arabic content:
1. Fill in the `(Arabic)` fields alongside the English ones
2. The site will automatically show Arabic to readers using the Arabic language version

---

## Publishing vs. drafts

- Changes are saved as drafts automatically in Sanity
- Click **Publish** to make changes live
- You can also click **Unpublish** to take content offline without deleting it

---

## Getting help

If anything looks broken or you're not sure where a field goes, the site's developer can check the schema definitions in `sanity/schemas/`.
