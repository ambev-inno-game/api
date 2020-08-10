import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { create } from '../service/domain/subscriber'

const subscriberController = express.Router()

subscriberController.post(
  '/subscriber',
  authAnonymous,
  asyncWrapper(async (req, res) => {
    res.json(await create(req.body))
  })
)

export { subscriberController }