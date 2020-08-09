import express from 'express'
import HttpStatus from 'http-status-codes'

import { asyncWrapper } from '../middleware/asyncWrapper'
import { authLogged } from '../middleware/authHandling'
import { create, updateTownhouse, deleteTownhouse, listAll } from '../service/domain/townhouse'
import { resolve } from '../service/general/responseHandling'

const townhouseController = express.Router()

townhouseController.get(
  '/townhouse',
  authLogged,
  asyncWrapper(async (req, res) => {
    await resolve(req, res, listAll)
  })
)

townhouseController.post(
  '/townhouse',
  authLogged,
  asyncWrapper(async (req, res) => {
    await create(req.body)
    res.sendStatus(HttpStatus.CREATED)
  })
)

townhouseController.put(
  '/townhouse',
  authLogged,
  asyncWrapper(async (req, res) => {
    await updateTownhouse(req.body)
    res.sendStatus(HttpStatus.NO_CONTENT)
  })
)

townhouseController.delete(
  '/townhouse/:id',
  authLogged,
  asyncWrapper(async (req, res) => {
    await deleteTownhouse(req.params)
    res.sendStatus(HttpStatus.NO_CONTENT)
  })
)

export { townhouseController }
