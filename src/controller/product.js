import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authSubscription } from '../middleware/authHandling'
import { listBySubscription } from '../service/domain/product'

const productController = express.Router()

productController.get(
  '/product/:subscriberId',
  authSubscription,
  asyncWrapper(async (req, res) => {
    res.json(await listBySubscription(req.params))
  })
)

export { productController }