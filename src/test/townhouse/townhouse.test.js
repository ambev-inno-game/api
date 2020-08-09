/* eslint-disable no-undef */
import HttpStatus from 'http-status-codes'
import request from 'supertest'

import { app, server } from '../../app'
import { createLoggedToken } from '../../service/general/auth'
import { cleanTestSeeds } from '../common/repositoryUtils'
import { insert, getNextId } from './townhouse.seed'

describe('Endpoint Integration test: /townhouse', () => {
  afterAll(async done => {
    await cleanTestSeeds()
    server.close()
    done()
  })

  test('GET without logged authorization should return ForbiddenAccessError', async done => {
    // arrange
    // act
    const response = await request(app).get('/townhouse')

    // assert
    expect(response.status).toBe(HttpStatus.FORBIDDEN)
    done()
  })

  test('GET with valid authorization should return All', async done => {
    // arrange
    const townhouse = {
      name: 'townhouse',
      contractExpirationDate: '01/01/2099',
    }

    await insert(townhouse)
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .get('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)

    // assert
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toBeDefined()
    expect(response.body.find(entry => entry.name === townhouse.name)).toBeDefined()
    done()
  })

  test('POST without logged authorization should return ForbiddenAccessError', async done => {
    // arrange
    const townhouse = {
      name: 'invalid',
      contractExpirationDate: '99/99/9999',
    }

    // act
    const response = await request(app)
      .post('/townhouse')
      .send({ townhouse })

    // assert
    expect(response.status).toBe(HttpStatus.FORBIDDEN)
    done()
  })

  test('POST invalid townhouse data should return BadRequestError', async done => {
    // arrange
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .post('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({})

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    done()
  })

  test('POST duplicated townhouse name should return BadRequestError with riginal error attached', async done => {
    // arrange
    const townhouse = {
      name: 'duplicated townhouse POST',
      contractExpirationDate: '01/01/2099',
    }
    await insert(townhouse)
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .post('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({ townhouse })

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    expect(response.body.originalError).toBeDefined()
    done()
  })

  test('POST valid townhouse should return 201', async done => {
    // arrange
    const townhouse = {
      name: 'valid townhouse POST',
      contractExpirationDate: '01/01/2099',
    }
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .post('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({ townhouse })

    // assert
    expect(response.status).toBe(HttpStatus.CREATED)
    done()
  })

  test('PUT without logged authorization should return ForbiddenAccessError', async done => {
    // arrange
    const townhouse = {
      name: 'invalid',
      contractExpirationDate: '99/99/9999',
    }

    // act
    const response = await request(app)
      .put('/townhouse')
      .send({ townhouse })

    // assert
    expect(response.status).toBe(HttpStatus.FORBIDDEN)
    done()
  })

  test('PUT invalid townhouse data should return BadRequestError', async done => {
    // arrange
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .put('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({})

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    done()
  })

  test('PUT duplicated townhouse name should return BadRequestError with riginal error attached', async done => {
    // arrange
    const existent = {
      name: 'existent townhouse PUT',
      contractExpirationDate: '01/01/2099',
    }
    const expected = await insert(existent)
    const update = { ...existent, id: expected.townhouses[0].id }

    const townhouse = {
      name: 'duplicated townhouse PUT',
      contractExpirationDate: '01/01/2099',
    }
    await insert(townhouse)
    update.name = townhouse.name

    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .put('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({ townhouse: update })

    // assert
    expect(response.status).toBe(HttpStatus.BAD_REQUEST)
    expect(response.body.originalError).toBeDefined()
    done()
  })

  test('PUT valid townhouse should return 204', async done => {
    // arrange
    const townhouse = {
      name: 'valid townhouse PUT',
      contractExpirationDate: '01/01/2099',
    }
    const expected = await insert(townhouse)
    townhouse.id = expected.townhouses[0].id
    townhouse.name = 'updated valid townhouse PUT'

    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .put('/townhouse')
      .set('Authorization', `Bearer ${loggedToken}`)
      .send({ townhouse })

    // assert
    expect(response.status).toBe(HttpStatus.NO_CONTENT)
    done()
  })

  test('DELETE without logged authorization should return ForbiddenAccessError', async done => {
    // arrange
    // act
    const response = await request(app).delete(`/townhouse/${1}`)

    // assert
    expect(response.status).toBe(HttpStatus.FORBIDDEN)
    done()
  })

  test('DELETE without existent townhouse should return NotFoundError', async done => {
    // arrange
    const nonexistentId = await getNextId()
    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .delete(`/townhouse/${nonexistentId}`)
      .set('Authorization', `Bearer ${loggedToken}`)

    // assert
    expect(response.status).toBe(HttpStatus.NOT_FOUND)
    done()
  })

  test('DELETE valid townhouse should return 204', async done => {
    // arrange
    const townhouse = {
      name: 'valid townhouse DELETE',
      contractExpirationDate: '01/01/2099',
    }
    const expected = await insert(townhouse)

    const loggedToken = createLoggedToken('test@test.com')

    // act
    const response = await request(app)
      .delete(`/townhouse/${expected.townhouses[0].id}`)
      .set('Authorization', `Bearer ${loggedToken}`)

    // assert
    expect(response.status).toBe(HttpStatus.NO_CONTENT)
    done()
  })
})
