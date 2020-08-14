import { AmbevAbstractModel } from '../common/ambevAbstractModel'
import { PreferenceModel } from '../preference/preferenceModel'

export class SubscriberModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.peopleCount = data.peopleCount
    this.preferences = data.preferences && data.preferences.map(pref => new PreferenceModel(pref))
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      peopleCount: this.peopleCount,
      preferences: this.preferences.map(pref => pref.toDto())
    }
  }

  static fromDb(data = {}) {
    return new SubscriberModel({
      id: data.id,
      name: data.name,
      peopleCount: data.people_count
    })
  }
}
