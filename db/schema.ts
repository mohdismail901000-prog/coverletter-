
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const coverLetters = pgTable("cover_letters", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk User ID
  jobDescription: text("job_description").notNull(),
  resumeText: text("resume_text"), // Optional if we want to store it
  generatedText: text("generated_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CoverLetter = typeof coverLetters.$inferSelect;
export type NewCoverLetter = typeof coverLetters.$inferInsert;
