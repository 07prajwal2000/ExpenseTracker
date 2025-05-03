import postgres from "postgres";
import { logInfo } from "./logger";

export let SQL: postgres.Sql<Record<string, unknown>>;

export async function initPostgres() {
  SQL = postgres({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    transform: postgres.fromCamel,
  });
  await SQL`SELECT 1`;
  logInfo("Connected to Postgres");
}