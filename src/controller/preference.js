import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { listAll } from '../service/domain/preference'

const preferenceController = express.Router()

preferenceController.get(
  '/preferences',
  authAnonymous,
  asyncWrapper(async (req, res) => {
    res.json(await listAll())
  })
)

export { preferenceController }