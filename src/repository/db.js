import { Pool } from 'pg'

const POOL = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

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
