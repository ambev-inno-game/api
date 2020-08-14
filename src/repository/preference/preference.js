import { executeParametrizedQuery, executeQuery } from '../db'
import { PreferenceModel, PreferenceCategoryScoreModel, PreferenceQuestionModel } from './preferenceModel'

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
      if (index > 0) scoreQuery += `, `
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

export async function loadAllGroupedByQuestion() {
  const questionQuery = `SELECT * FROM ambev_preference_question`
  const questionResult = await executeQuery(questionQuery)
  const questions = questionResult.rows.map(row => PreferenceQuestionModel.fromDb(row))

  let preferenceQuery = `SELECT * FROM ambev_preference WHERE question_id IN (`
  const preferenceParams = []

  // gambi
  if (questions && questions.length) {
    questions.forEach((question, index) => {
      if (index > 0) preferenceQuery += `, `
      preferenceQuery += `$${index + 1}`
      preferenceParams.push(question.id)
    })
    preferenceQuery += `)`

    const preferenceResponse = await executeParametrizedQuery(preferenceQuery, preferenceParams)
    const preferences = preferenceResponse.rows.map(row => PreferenceModel.fromDb(row))
    questions.forEach(question => {
      question.options = preferences.filter(pref => pref.questionId === question.id)
    })
  }

  return questions
}