const dotenv = require('dotenv')
dotenv.config()
const { Sequelize } = require('sequelize')

const db = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USERNAME,
  process.env.PG_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    ssl: process.env.NODE_ENV === 'production' && { rejectUnauthorized: false },
    pool: { max: 1, idle: Infinity, maxUses: Infinity },
  }
)

const connectDB = async () => {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = { connectDB, db }
