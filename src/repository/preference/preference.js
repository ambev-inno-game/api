import { executeParametrizedQuery } from '../db'
import { PreferenceModel } from './preferenceModel'

export async function loadBySubscriberId(subscriberId) {
  const query = `SELECT * FROM ambev_preference pre ` +
    `INNER JOIN ambev_subscriber_preference sup ON sup.preference_id = pre.id ` +
    `WHERE sup.subscriber_id = $1 `
  const params = [subscriberId]
  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => PreferenceModel.fromDb(row))
}