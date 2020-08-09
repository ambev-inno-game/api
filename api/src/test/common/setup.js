import { getRandomString } from '../../service/general/utils'

export default () => {
  process.env.JWT_SECRET = getRandomString()
  process.env.JWT_DURATION = 20
  process.env.API_KEY = 'rSdx0w8ShgyK'
  process.env.PGDATABASE = 'as_db'
  process.env.PGUSER = 'as_db_admin'
  process.env.PGPASSWORD = '1CvtaAolPQx'
  process.env.PGPORT = '4100'
  process.env.PGHOST = 'localhost'
}
