import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authSubscription } from '../middleware/authHandling'
import { getHome } from '../service/domain/home'

const homeController = express.Router()

homeController.get(
  '/home',
  authSubscription,
  asyncWrapper(async (req, res) => res.json(await getHome()))
)

export { homeController }