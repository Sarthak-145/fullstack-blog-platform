import { Pool } from 'pg';
import dotenv from 'dotenv';

//loads all the .env variables in process.env
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;
