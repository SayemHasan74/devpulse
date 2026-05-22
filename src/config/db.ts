import { Pool, QueryResultRow } from "pg";

import { env } from "./env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = async <T extends QueryResultRow>(sql: string, values: unknown[] = []) => {
  return pool.query<T>(sql, values);
};
