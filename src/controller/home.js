import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { getHome } from '../service/domain/home'

const homeController = express.Router()

homeController.get(
  '/home',
  authAnonymous,
  asyncWrapper(async (req, res) => res.json(await getHome()))
)

export { homeController }