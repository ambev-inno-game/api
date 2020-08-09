import HttpStatus from 'http-status-codes'

export const validateRecaptcha = () => {
  return new Promise(resolve => {
    process.nextTick(() => resolve({ status: HttpStatus.OK }))
  })
}
