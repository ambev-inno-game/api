import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { createAnonymousToken, refreshLoggedToken } from '../service/general/auth'

const authController = express.Router()

authController.post(
  '/auth',
  asyncWrapper(async (req, res) => {
    const token = await createAnonymousToken(req.body)
    res.json(token)
  })
)

authController.post(
  '/auth/refresh',
  asyncWrapper(async (req, res) => {
    const token = await refreshLoggedToken(req.body)
    res.json(token)
  })
)

export { authController }
