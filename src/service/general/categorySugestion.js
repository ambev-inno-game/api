import { loadAll } from '../../repository/category/category'

export async function getSuggestedCategories(preferenceCategories) {
  const categoryScore = {}
  const allCategories = await loadAll()

  allCategories.forEach(category => {
    let score = 0

    preferenceCategories.forEach(pref => {
      const catScore = pref.categoryScore.find(catScore => catScore.categoryId === category.id)
      if (catScore) score += catScore.score
    })

    categoryScore[category.title] = { category, score }
  })

  const orderedCategories = Object.values(categoryScore).sort((catA, catB) => {
    // 1 - orderBy score
    if (catA.score > catB.score) return -1
    if (catA.score < catB.score) return 1

    // 2 - orderBy category
    if (catA.title > catB.title) return 1
    if (catA.title < catB.title) return -1

    return 0
  })

  return orderedCategories.map(ordered => ordered.category)
}
