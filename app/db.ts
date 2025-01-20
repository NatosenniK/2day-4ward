import { drizzle } from "drizzle-orm/postgres-js";
import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export const UserTable = pgTable("User", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 64 }),
  password: varchar("password", { length: 64 }),
  name: varchar("name", { length: 64 }),
});

export const DailyLogTable = pgTable("Daily_Log", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => UserTable.id, {
    onDelete: "cascade",
  }),
  mood: varchar("mood", { length: 64 }),
  today: varchar("today", { length: 255 }),
  yesterday: varchar("yesterday", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export async function getUser(email: string) {
  const users = await ensureTableExists();
  const resp = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((rows) => rows[0] || null);

  console.log("Login resp: ", resp);
  return resp;
}

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash, name });
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64),
        name VARCHAR(64)
      );`;
  }

  return UserTable;
}

async function ensureLogTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'Daily_Log'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "Daily_Log" (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES "User"(id) ON DELETE CASCADE,
        mood VARCHAR(64),
        today VARCHAR(255),
        yesterday VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );`;
  }

  return DailyLogTable;
}

export async function createUserEntry(
  user_id: number,
  mood: string,
  today: string,
  yesterday: string
) {
  const dailyLogTable = await ensureLogTableExists();

  return await db.insert(DailyLogTable).values({
    user_id,
    mood,
    today,
    yesterday,
  });
}
