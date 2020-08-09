import { executeParametrizedQuery, executeQuery } from '../../repository/db'
import { TownhouseModel } from '../../repository/townhouse/townhouseModel'
import { getDummyModelData } from '../common/utils'

const defaultData = { ...getDummyModelData(TownhouseModel), contractExpirationDate: new Date() }

async function insertTownhouse(townhouse) {
  const query = `INSERT INTO as_townhouse (name, contract_expiration_date) VALUES ($1, $2) RETURNING * `
  const params = [townhouse.name, townhouse.contractExpirationDate]
  const results = await executeParametrizedQuery(query, params)
  return results.rows.map(row => new TownhouseModel(row))
}

export async function insert(data) {
  const townhouse = { ...defaultData, ...data }

  const inserted = await insertTownhouse(townhouse)
  return { townhouses: inserted }
}

export async function getNextId() {
  const query = `SELECT nextval('as_townhouse_id_seq') as next_id`
  const results = await executeQuery(query)
  return results.rows[0].next_id
}
