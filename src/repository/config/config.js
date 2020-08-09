import { executeParametrizedQuery } from '../db'
import { ConfigModel } from './configModel'

export async function loadConfig(key) {
  const query = 'SELECT config_key, config_value FROM ambev_config WHERE config_key = $1'
  const params = [key]
  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => ConfigModel.fromDb(row))
}
