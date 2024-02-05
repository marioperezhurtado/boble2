import { env } from "$env/dynamic/private";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client({
  connectionString: env.DATABASE_URL,
});

await client.connect();

export const db = drizzle(client);
