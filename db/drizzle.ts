/*import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(process.env.DATABASE_URL!);*/
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

//const connectionString = "postgresql://postgres:1234@localhost:5432/salary"

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool });