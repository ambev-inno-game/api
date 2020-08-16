import express from 'express'

import { authController } from './auth'
import { loginController } from './login'
import { homeController } from './home'
import { subscriberController } from './subscriber'
import { preferenceController } from './preference'

const baseRoute = express.Router()
baseRoute.get('/', (req, res) => {
  res.send('BATATA')
})

export function configRoutes(app) {
  app.use(baseRoute)
  app.use(authController)
  app.use(loginController)
  app.use(homeController)
  app.use(subscriberController)
  app.use(preferenceController)
}
