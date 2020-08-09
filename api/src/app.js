import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { configRoutes } from './controller/index'
import { errorHandlingMiddleware } from './middleware/errorHandling'

const PORT = process.env.PORT || 4001
const app = express()

app.use(bodyParser.json({ limit: '1.1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

configRoutes(app)
app.use(errorHandlingMiddleware)

const server = app.listen(PORT, err => {
  if (err) throw err
  console.log(`HTTP Server listening on :: ${PORT}`)
})

export { app, server }
