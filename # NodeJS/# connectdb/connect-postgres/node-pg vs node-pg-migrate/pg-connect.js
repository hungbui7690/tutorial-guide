import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const { Client, Pool } = pg

/*
  https://salsita.github.io/node-pg-migrate/getting-started -> migrate PostgreSQL database

  1. Run migrations
  2. npm add --save-dev node-pg-migrate
  3. package.json 
      -> "migrate": "node-pg-migrate"
      -> remove "type": "module"
  4. .env 
      -> Development -> DATABASE_URL='postgresql://username:password@host:5432/dbname'
      -> Production  -> DATABASE_URL='postgresql://username:password@host:5432/dbname?ssl=true'
  -> npm run migrate create my-first-migration -> create migration/ -> edit that file
  -> npm run migrate up
  5. change back to "type": "module" in package.json


*/

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' && { rejectUnauthorized: false }, // turn this on for production
}

const pool = new Pool(config)

export const connectDB = async () => {
  try {
    const client = await pool.connect()
    console.log('Connected to PostgreSQL')

    return client
  } catch (error) {
    console.log(error)
  }
}
