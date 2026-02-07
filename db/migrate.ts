import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import { sql } from "drizzle-orm";

dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL!;

async function main() {
    const connection = neon(databaseUrl);
    const db = drizzle(connection);

    console.log("Pushing schema...");

    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "cover_letters" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" text NOT NULL,
        "job_description" text NOT NULL,
        "resume_text" text,
        "generated_text" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
    );
  `);

    console.log("Schema pushed successfully!");
    process.exit(0);
}

main().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
});
