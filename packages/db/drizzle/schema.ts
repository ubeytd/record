import { pgTable, uuid, text, jsonb, vector, check, timestamp, boolean, index, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const documents = pgTable("documents", {
	id: uuid().primaryKey().notNull(),
	data: text(),
	metadata: jsonb(),
	embedding: vector({ dimensions: 384 }),
});

export const content = pgTable("content", {
	id: uuid().primaryKey().notNull(),
	data: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	isBookmarked: boolean("is_bookmarked"),
	summary: text(),
	title: text(),
	status: text().default('created').notNull(),
	createdBy: uuid("created_by"),
}, (table) => [
	check("content_status_check", sql`status = ANY (ARRAY['created'::text, 'transcribing'::text, 'summarizing'::text, 'error'::text, 'transcribed'::text, 'summarized'::text])`),
]);

export const source = pgTable("source", {
	id: uuid().primaryKey().notNull(),
	type: text(),
	data: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	contentId: uuid("content_id"),
	createdBy: uuid("created_by"),
}, (table) => [
	index("idx_source_content_id").using("btree", table.contentId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.contentId],
			foreignColumns: [content.id],
			name: "source_content_id_fkey"
		}).onDelete("cascade"),
	check("source_type_check", sql`type = ANY (ARRAY['audio'::text, 'YouTube'::text, 'pdf'::text, 'web'::text])`),
]);
