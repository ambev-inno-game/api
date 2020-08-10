import { AUTH_LEVEL } from '../../constants/index'
import { BadRequestError } from '../../errors/badRequestError'
import { SubscriberModel } from '../../repository/subscriber/subscriberModel'
import { safeCreateAuth } from '../general/auth'
import { save, findById } from '../../repository/subscriber/subscriber'

export async function create({ subscriber }) {
  if (!subscriber) throw new BadRequestError()

  const model = new SubscriberModel(subscriber)
  const subscriberId = await save(model)

  return { name: model.name, subscriberId, ...safeCreateAuth({ name: model.name, subscriberId, level: AUTH_LEVEL.SUBSCRIPTION }) }
}

export async function refreshSubscription({ subscriberId }) {
  const subscriber = await findById(subscriberId)
  return { name: subscriber.name, subscriberId, ...safeCreateAuth({ name: subscriber.name, subscriberId: subscriber.id, level: AUTH_LEVEL.SUBSCRIPTION }) }
}

