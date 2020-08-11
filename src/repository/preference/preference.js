import { executeParametrizedQuery } from '../db'
import { PreferenceModel, PreferenceCategoryScoreModel } from './preferenceModel'

export async function loadBySubscriberId(subscriberId) {
  const query = `SELECT pre.* FROM ambev_preference pre ` +
    `INNER JOIN ambev_subscriber_preference sup ON sup.preference_id = pre.id ` +
    `WHERE sup.subscriber_id = $1 `
  const params = [subscriberId]
  const response = await executeParametrizedQuery(query, params)
  const preferences = response.rows.map(row => PreferenceModel.fromDb(row))

  // gambi
  if (preferences && preferences.length) {
    let scoreQuery = `SELECT cat.title, cat.category_description, cat.id, pca.preference_id, score FROM ambev_category cat ` +
      `INNER JOIN ambev_preference_category pca ON pca.category_id = cat.id ` +
      `WHERE pca.preference_id IN (`
    const scoreParams = []

    preferences.forEach((pref, index) => {
      if(index > 0) scoreQuery += `, `
      scoreQuery += `$${index + 1}`
      scoreParams.push(pref.id)
    })
    scoreQuery += `)`

    const scoreResponse = await executeParametrizedQuery(scoreQuery, scoreParams)
    const categoryScore = scoreResponse.rows.map(catScore => PreferenceCategoryScoreModel.fromDb(catScore))
    preferences.forEach(pref => {
      pref.categoryScore = categoryScore.filter(catScore => catScore.preferenceId = pref.id)
    })
  }

  return preferences
}