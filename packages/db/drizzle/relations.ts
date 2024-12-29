import { relations } from "drizzle-orm/relations";
import { content, source } from "./schema.js";

export const sourceRelations = relations(source, ({one}) => ({
	content: one(content, {
		fields: [source.contentId],
		references: [content.id]
	}),
}));

export const contentRelations = relations(content, ({many}) => ({
	sources: many(source),
}));