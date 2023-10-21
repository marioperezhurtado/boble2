import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const CONNECTION_STRING = "postgresql://postgres@localhost:5432/boble";

// for migrations
const migrationClient = postgres(CONNECTION_STRING, { max: 1 });
migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

// for queries
export const queryClient = postgres(CONNECTION_STRING);
export const db: PostgresJsDatabase = drizzle(queryClient);
