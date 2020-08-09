import { executeQuery, closeConnections } from '../../repository/db'

export async function cleanTestSeeds() {
  const query = `SELECT as_truncate_tables('${process.env.PGUSER}');`
  await executeQuery(query)
  await closeConnections()
}
