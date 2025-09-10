import { pgTable, text, varchar, integer, numeric, timestamp, boolean, unique, serial, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const campaigns = pgTable("campaigns", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	status: varchar({ length: 50 }).default('draft').notNull(),
	userId: text("user_id").notNull(),
	totalLeads: integer("total_leads").default(0),
	successfulLeads: integer("successful_leads").default(0),
	responseRate: numeric("response_rate", { precision: 5, scale:  2 }).default('0'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const interactions = pgTable("interactions", {
	id: text().primaryKey().notNull(),
	leadId: text("lead_id").notNull(),
	type: varchar({ length: 50 }).notNull(),
	subject: varchar({ length: 255 }),
	content: text(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
});

export const leads = pgTable("leads", {
	id: text().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	company: varchar({ length: 255 }),
	position: varchar({ length: 255 }),
	status: varchar({ length: 50 }).default('pending').notNull(),
	campaignId: text("campaign_id"),
	userId: text("user_id").notNull(),
	lastContactDate: timestamp("last_contact_date", { mode: 'string' }),
	notes: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const linkedinAccounts = pgTable("linkedin_accounts", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	profileUrl: varchar("profile_url", { length: 500 }),
	accessToken: text("access_token"),
	isActive: boolean("is_active").default(true),
	lastSyncAt: timestamp("last_sync_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const messages = pgTable("messages", {
	id: text().primaryKey().notNull(),
	campaignId: text("campaign_id"),
	leadId: text("lead_id"),
	subject: varchar({ length: 255 }),
	content: text().notNull(),
	type: varchar({ length: 50 }).notNull(),
	status: varchar({ length: 50 }).default('sent').notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
});

export const sessions = pgTable("sessions", {
	id: text().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	sessionToken: text("session_token").notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	unique("sessions_session_token_unique").on(table.sessionToken),
]);

export const verificationTokens = pgTable("verification_tokens", {
	identifier: varchar({ length: 255 }).notNull(),
	token: varchar({ length: 255 }).notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const accounts = pgTable("accounts", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	type: varchar({ length: 255 }).notNull(),
	provider: varchar({ length: 255 }).notNull(),
	providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar({ length: 255 }),
	idToken: text("id_token"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
]);
