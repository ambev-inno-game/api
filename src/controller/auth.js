import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { refreshToken } from '../service/general/auth'

const authController = express.Router()

authController.post(
  '/auth/refresh',
  authAnonymous,
  asyncWrapper(async (req, res) => {
    res.json(await refreshToken(req.body))
  })
)

export { authController }
