import HttpStatus from 'http-status-codes'
import request from 'request'

import { BadRequestError } from '../../errors/badRequestError'

function validate(captchaResponse, secretKey) {
  return new Promise((resolve, reject) => {
    if (!captchaResponse) {
      reject(new BadRequestError('ERROR: reCaptcha response is required!'))
    }

    const URL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`

    request.post(URL, (error, response, body) => {
      body = JSON.parse(body)

      if (error) {
        reject(new Error(`ERROR: Trying to validade reCaptcha results in -> ${error}`))
      }

      if (!body.success) {
        reject(new Error(`ERROR: reCaptcha Failed => ${body['error-codes']}`))
      }

      resolve()
    })
  })
}

export async function validateRecaptcha(captchaResponse, secretKey) {
  try {
    await validate(captchaResponse, secretKey)
  } catch (error) {
    error.statusCode = HttpStatus.BAD_REQUEST
    throw error
  }
}
