import { loadAllGroupedByQuestion } from '../../repository/preference/preference'

export async function listAll() {
  return await loadAllGroupedByQuestion()
}