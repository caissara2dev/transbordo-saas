import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

declare global {
  var __transbordoSaasSql: ReturnType<typeof postgres> | undefined;
  var __transbordoSaasDb: PostgresJsDatabase<typeof schema> | undefined;
}

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return url;
}

export function getSqlClient() {
  if (!globalThis.__transbordoSaasSql) {
    globalThis.__transbordoSaasSql = postgres(getDatabaseUrl(), {
      prepare: false
    });
  }

  return globalThis.__transbordoSaasSql;
}

export function getDb() {
  if (!globalThis.__transbordoSaasDb) {
    globalThis.__transbordoSaasDb = drizzle(getSqlClient(), { schema });
  }

  return globalThis.__transbordoSaasDb;
}
