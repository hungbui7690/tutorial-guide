require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000, maxUses: Infinity },
  },
  production: {
    dialect: 'postgres',
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000, maxUses: Infinity },
  },
}
