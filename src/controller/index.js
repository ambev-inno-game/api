import express from 'express'

import { authController } from './auth'
import { loginController } from './login'
import { townhouseController } from './townhouse'

const baseRoute = express.Router()
baseRoute.get('/', (req, res) => {
  res.send('BATATA')
})

export function configRoutes(app) {
  app.use(baseRoute)
  app.use(authController)
  app.use(loginController)
  app.use(userController)
  app.use(townhouseController)
}
