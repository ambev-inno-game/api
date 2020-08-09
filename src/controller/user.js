import express from 'express'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authLogged } from '../middleware/authHandling'
import { getAllUsers, getUser } from '../service/domain/user'
import { resolve } from '../service/general/responseHandling'

const userController = express.Router()

userController.get(
  '/user',
  authLogged,
  asyncWrapper(async (req, res) => {
    await resolve(req, res, getAllUsers)
  })
)

userController.get(
  '/user/:id',
  authLogged,
  asyncWrapper(async (req, res) => {
    await resolve(req, res, getUser)
  })
)

export { userController }
