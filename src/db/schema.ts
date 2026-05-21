import { relations } from "drizzle-orm";
import { boolean, index, pgTable, serial, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const guild = pgTable(
  "guild",
  {
    id: serial("id").primaryKey().notNull(),
    guildId: varchar("guildId").notNull(),
    trackAll: boolean("trackAll").default(false).notNull(),
    logChannelId: varchar("logChannelId"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("guild_guildId_key").on(table.guildId)],
);

export const guildRelations = relations(guild, ({ many }) => ({
  premiumSubscriptions: many(premiumSubscription),
}));

export const premiumSubscription = pgTable(
  "premiumSubscription",
  {
    id: serial("id").primaryKey().notNull(),
    guildId: varchar("guildId").notNull(),
    planId: varchar("planId").notNull(),
    premiumFrom: timestamp("premiumFrom").notNull(),
    premiumUntil: timestamp("premiumUntil").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("premium_id_key").on(table.id), index("premium_guildId_idx").on(table.guildId)],
);

export const premiumSubscriptionRelations = relations(premiumSubscription, ({ one }) => ({
  guild: one(guild, {
    fields: [premiumSubscription.guildId],
    references: [guild.guildId],
  }),
}));
