import { executeParametrizedQuery } from '../../repository/db'
import { UserModel } from '../../repository/user/userModel'
import { encryptText } from '../../service/general/encrypt'
import { getDummyModelData } from '../common/utils'

const defaultOptions = {
  count: 1,
}

function generateUser() {
  const data = getDummyModelData(UserModel)
  data.encryptedPassword = encryptText(data.password)
  return data
}

async function insertUser(count) {
  const users = []
  const insertPromisses = []
  for (let i = 0; i < count; i++) {
    const user = generateUser()
    const query = `INSERT INTO as_user (name, email, password) VALUES ($1, $2, $3)`
    const params = [user.name, user.email, user.encryptedPassword]
    insertPromisses.push(executeParametrizedQuery(query, params))
    users.push(user)
  }
  await Promise.all(insertPromisses)
  return users
}

export async function insert(options) {
  const { count } = { ...defaultOptions, ...options }

  const users = await insertUser(count)
  return {
    users,
  }
}
