import { executeParametrizedQuery, executeQuery } from '../db'
import { PreferenceModel, PreferenceQuestionModel } from './preferenceModel'

export async function loadAllGroupedByQuestion() {
  const questionQuery = `SELECT * FROM ambev_preference_question ORDER BY id ASC`
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