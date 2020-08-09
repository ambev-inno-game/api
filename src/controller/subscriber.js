import express from 'express'
import HttpStatus from 'http-status-codes'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { create } from '../service/domain/subscriber'

const subscriberController = express.Router()

subscriberController.post(
  '/subscriber',
  authAnonymous,
  asyncWrapper(async (req, res) => {
    await create(req.body)
    res.sendStatus(HttpStatus.CREATED)
  })
)

export { subscriberController }