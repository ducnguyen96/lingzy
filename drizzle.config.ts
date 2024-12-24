import { cwd } from "process";
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/lib/server/schemas/index.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL!,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
