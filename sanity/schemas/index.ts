import { articleSchema } from "./article";
import { blogEntrySchema } from "./blogEntry";
import { checklistSchema } from "./checklist";
import { timelineMilestoneSchema } from "./timelineMilestone";
import { resourceSchema } from "./resource";
import { islamicFinancePageSchema } from "./islamicFinancePage";
import { siteSettingsSchema } from "./siteSettings";

export const schemaTypes = [
  articleSchema,
  blogEntrySchema,
  checklistSchema,
  timelineMilestoneSchema,
  resourceSchema,
  islamicFinancePageSchema,
  siteSettingsSchema,
];
