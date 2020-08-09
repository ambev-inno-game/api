import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authAnonymous } from '../middleware/authHandling'
import { login } from '../service/domain/login'

const loginController = express.Router()

loginController.post(
  '/login',
  authAnonymous,
  asyncWrapper(async (req, res) => res.json(await login(req.body)))
)

export { loginController }
