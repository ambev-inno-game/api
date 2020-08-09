import { executeParametrizedQuery } from '../db'

export async function save(subscriber) {
  const subscriberQuery = `INSERT INTO ambev_subscriber (name, child_count, adult_count) VALUES ($1, $2, $3) RETURNING id`
  const subscriberParams = [subscriber.name, subscriber.childCount, subscriber.adultCount]
  const results = await executeParametrizedQuery(subscriberQuery, subscriberParams)
  const insertedId = results.rows[0].id

  // TODO: improve
  const preferencesInsertionPromises = []
  subscriber.preferences.forEach(pref => {
    const preferencesQuery = `INSERT INTO ambev_subscriber_preference (subscriber_id, preference_id) VALUES ($1, $2)`
    const subscriberParams = [ insertedId, pref.id ]
    preferencesInsertionPromises.push(executeParametrizedQuery(preferencesQuery, subscriberParams))
  });

  await Promise.all(preferencesInsertionPromises)
}