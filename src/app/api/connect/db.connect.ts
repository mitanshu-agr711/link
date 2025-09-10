// /connect/db.connect.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export async function testDatabaseConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time, version() as version`;
    return {
      success: true,
      serverTime: result[0].current_time,
      version: result[0].version,
    };
  } catch (error) {
    console.error("Database connection test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
