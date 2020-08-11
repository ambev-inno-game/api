import { loadBySubscriberId } from '../../repository/preference/preference'
import { loadByCategories } from '../../repository/product/product'
import { BadRequestError } from '../../errors/badRequestError'
import { getSuggestedCategories } from '../general/categorySugestion'

export async function listBySubscription({ subscriberId }) {
  if (!subscriberId) throw new BadRequestError('Assinante inválido!')

  const preferences = await loadBySubscriberId(subscriberId)
  if (!preferences || !preferences.length) throw new BadRequestError('Assinante inválido!')

  const suggestedCategories = await getSuggestedCategories(preferences)
  const products = await loadByCategories(suggestedCategories)

  return suggestedCategories.map(category => ({
    category,
    products: products.filter(product => product.categoryId === category.id)
  }))
}
