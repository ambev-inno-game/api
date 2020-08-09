/* eslint-disable no-undef */
import HttpStatus from 'http-status-codes'
import request from 'supertest'

import { app, server } from '../../app'
import { AUTH_LEVEL } from '../../constants'
import { verifyToken } from '../../service/general/token'

const { API_KEY } = process.env

describe('Endpoint Integration test: /auth', () => {
  afterAll(done => {
    server.close()
    done()
  })

  test('POST valid API Key should return valid anonymous token', async done => {
    // arrange
    const data = { apiKey: API_KEY }

    // act
    const response = await request(app)
      .post('/auth')
      .send(data)

    // assert
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toBeDefined()

    const tokenData = await verifyToken(response.body)
    expect(tokenData.level).toBe(AUTH_LEVEL.ANONYMOUS)
    done()
  })

  test('POST invalid API Key should return BadRequestError', async done => {
    // arrange
    const data = { apiKey: 'invalid' }

    // act
    const response = await request(app)
      .post('/auth')
      .send(data)

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    done()
  })
})
