import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __db_sql: ReturnType<typeof postgres> | undefined;
}

const sql =
  globalThis.__db_sql ?? postgres(process.env.DATABASE_URL!, { max: 5 });
if (process.env.NODE_ENV !== "production") globalThis.__db_sql = sql;

export const db = drizzle({ client: sql });
