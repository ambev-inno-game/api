import { PREFERENCES, CATEGORIES } from '../../constants/index'

export function getSuggestedCategories(preferenceList) {
  const preferenceCategories = preferenceList.map(preference => Object.values(PREFERENCES).find(pref => preference.name === pref.name))
  const categoryScore = {}

  Object.values(CATEGORIES).forEach(category => {
    let score = 0

    preferenceCategories.forEach(pref => {
      const catPoint = pref.categoryPoints.find(catPoint => catPoint.categoryName === category)
      if (catPoint) score += catPoint.score
    })

    categoryScore[category] = { category, score }
  })

  const orderedCategories = Object.values(categoryScore).sort((catA, catB) => {
    // 1 - orderBy score
    if (catA.score > catB.score) return -1
    if (catA.score < catB.score) return 1

    // 2 - orderBy category
    if (catA.category > catB.category) return 1
    if (catA.category < catB.category) return -1

    return 0
  })

  return orderedCategories.map(cat => cat.category)
}
