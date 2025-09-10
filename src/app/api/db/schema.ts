import { createId } from "@paralleldrive/cuid2";



import { 
  pgTable, 
  varchar, 
  text, 
  integer, 
  boolean, 
  timestamp, 
  decimal 
} from "drizzle-orm/pg-core";



export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  expires: timestamp("expires").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});




export const accounts = pgTable("accounts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),   // ✅ works now
  tokenType: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  idToken: text("id_token"),
});


export const verificationTokens = pgTable("verification_tokens", {
  identifier: varchar("identifier", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expires: timestamp("expires").notNull(),
});

// Application tables
export const campaigns = pgTable("campaigns", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("draft"), // draft, active, paused, completed
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalLeads: integer("total_leads").default(0),
  successfulLeads: integer("successful_leads").default(0),
  responseRate: decimal("response_rate", { precision: 5, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  position: varchar("position", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"), // pending, contacted, responded, converted
  campaignId: text("campaign_id")
    .references(() => campaigns.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lastContactDate: timestamp("last_contact_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const interactions = pgTable("interactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  leadId: text("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // email, call, meeting, note
  subject: varchar("subject", { length: 255 }),
  content: text("content"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  campaignId: text("campaign_id")
    .references(() => campaigns.id, { onDelete: "cascade" }),
  leadId: text("lead_id")
    .references(() => leads.id, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 255 }),
  content: text("content").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // outbound, inbound
  status: varchar("status", { length: 50 }).notNull().default("sent"), // sent, delivered, opened, replied
  sentAt: timestamp("sent_at").defaultNow().notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const linkedinAccounts = pgTable("linkedin_accounts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  profileUrl: varchar("profile_url", { length: 500 }),
  accessToken: text("access_token"),
  isActive: boolean("is_active").default(true),
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Interaction = typeof interactions.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type LinkedInAccount = typeof linkedinAccounts.$inferSelect;
