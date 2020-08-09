import { getRandomString } from '../../service/general/utils'

export function getDummyModelData(Model) {
  const properties = Object.keys(new Model())
  const data = {}
  properties.forEach(prop => {
    data[prop] = getRandomString()
  })
  return data
}
