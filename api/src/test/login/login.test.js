/* eslint-disable no-undef */
import HttpStatus from 'http-status-codes'
import request from 'supertest'

import { app, server } from '../../app'
import { AUTH_LEVEL } from '../../constants/index'
import { safeCreateAnonymousToken } from '../../service/general/auth'
import { verifyToken } from '../../service/general/token'
import { cleanTestSeeds } from '../common/repositoryUtils'
import { insert } from './login.seed'

describe('Endpoint Integration test: /login', () => {
  afterAll(async done => {
    await cleanTestSeeds()
    server.close()
    done()
  })

  test('POST without anounymous authorization should return ForbiddenAccessError', async done => {
    // arrange
    const data = {
      email: 'email',
      password: 'password',
    }

    // act
    const response = await request(app)
      .post('/login')
      .send(data)

    // assert
    expect(response.status).toBe(HttpStatus.FORBIDDEN)
    done()
  })

  test('POST invalid login data should return BadRequestError', async done => {
    // arrange
    await insert()
    const data = {
      email: 'invalid',
      password: 'invalid',
    }
    const anonymousToken = safeCreateAnonymousToken()

    // act

    const response = await request(app)
      .post('/login')
      .set('Authorization', `Bearer ${anonymousToken}`)
      .send(data)

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    done()
  })

  test('POST valid login data should return userdata and logged token', async done => {
    // arrange
    const expected = await insert()
    const expectedUser = expected.users[0]
    const data = {
      email: expectedUser.email,
      password: expectedUser.password,
    }
    const anonymousToken = safeCreateAnonymousToken()

    // act

    const response = await request(app)
      .post('/login')
      .set('Authorization', `Bearer ${anonymousToken}`)
      .send(data)

    // assert
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toBeDefined()
    expect(response.body.name).toBe(expectedUser.name)
    expect(response.body.email).toBe(expectedUser.email)

    const token = await verifyToken(response.body)
    expect(token).toBeDefined()
    expect(token.email).toBe(expectedUser.email)
    expect(token.level).toBe(AUTH_LEVEL.LOGGED)
    done()
  })
})
