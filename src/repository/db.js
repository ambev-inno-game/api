import { Pool } from 'pg'

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const localConfig = {
  user: process.env.PGUSER,
  host: process.env.DATABASE_URL,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}

// gambi
const isDev = process.env.ENVIRONMENT === 'dev'
const POOL = new Pool(isDev ? localConfig : prodConfig)

export async function executeQuery(query) {
  try {
    const res = await POOL.query(query)
    return res
  } catch (err) {
    console.error(`SQL ERROR:  ${err}`)
    throw err
  }
}

export async function executeParametrizedQuery(query, params) {
  try {
    const res = await POOL.query(query, params)
    return res
  } catch (err) {
    console.error(`SQL ERROR:  ${err}`)
    throw err
  }
}

export async function closeConnections() {
  await POOL.end()
}
