import { executeParametrizedQuery } from '../db'
import { ProductModel } from './productModel'

export async function loadByCategories(categories) {
  let query = `SELECT * FROM ambev_product WHERE category IN (`
  const params = []
  categories.forEach((category, index) => {
    if(index > 0) query += `, `
    query += `$${index + 1}`
    params.push(category)
  })
  query += `)`

  const response = await executeParametrizedQuery(query, params)
  return response.rows.map(row => ProductModel.fromDb(row))
}