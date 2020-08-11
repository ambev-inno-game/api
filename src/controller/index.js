import express from 'express'

import { authController } from './auth'
import { loginController } from './login'
import { townhouseController } from './townhouse'
import { homeController } from './home'
import { subscriberController } from './subscriber'
import { productController } from './product'

const baseRoute = express.Router()
baseRoute.get('/', (req, res) => {
  res.send('BATATA')
})

export function configRoutes(app) {
  app.use(baseRoute)
  app.use(authController)
  app.use(loginController)
  app.use(townhouseController)
  app.use(homeController)
  app.use(subscriberController)
  app.use(productController)
}
