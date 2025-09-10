import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: '.env' });

console.log("✅ DATABASE_URL from env:", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./src/app/api/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
