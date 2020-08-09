import { POSTGRE_ERROR_CODES } from '../../constants'
import { BadRequestError } from '../../errors/badRequestError'
import { NotFoundError } from '../../errors/notFoundError'
import { save, update, remove, findAll, findTownhouse } from '../../repository/townhouse/townhouse'
import { TownhouseModel } from '../../repository/townhouse/townhouseModel'

const INVALID_DATA_MESSAGE = 'Dados inválidos.'
const NOT_FOUND_MESSAGE = 'Condomínio não encontrado.'
const UK_VIOLATION_MESSAGE = 'Esse nome de condomínio já está cadastrado.'

function handleUniqueKeyViolation(err) {
  if (err.code === POSTGRE_ERROR_CODES.UK_VIOLATION)
    throw new BadRequestError(UK_VIOLATION_MESSAGE, err)
  throw err
}

export async function listAll() {
  return findAll()
}

export async function create({ townhouse }) {
  if (!townhouse) throw new BadRequestError(INVALID_DATA_MESSAGE)

  try {
    await save(new TownhouseModel(townhouse))
  } catch (err) {
    handleUniqueKeyViolation(err)
  }
}

export async function updateTownhouse({ townhouse }) {
  if (!townhouse || !townhouse.id) throw new BadRequestError(INVALID_DATA_MESSAGE)

  const existent = await findTownhouse(townhouse.id)
  if (!existent) throw new NotFoundError(NOT_FOUND_MESSAGE)

  try {
    await update(townhouse)
  } catch (err) {
    handleUniqueKeyViolation(err)
  }
}

export async function deleteTownhouse({ id }) {
  const existent = await findTownhouse(id)
  if (!existent.length) throw new NotFoundError(NOT_FOUND_MESSAGE)

  await remove(id)
}
