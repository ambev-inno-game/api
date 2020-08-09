import { BadRequestError } from '../../errors/badRequestError'
import { SubscriberModel } from '../../repository/subscriber/subscriberModel'

import { save } from '../../repository/subscriber/subscriber'

export async function create({ subscriber }) {
  if (!subscriber) throw new BadRequestError()

  await save(new SubscriberModel(subscriber))
}

