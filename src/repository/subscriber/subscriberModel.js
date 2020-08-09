import { AmbevAbstractModel } from '../common/ambevAbstractModel'
import { PreferenceModel } from '../preference/preferenceModel'

export class SubscriberModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.childCount = data.childCount
    this.adultCount = data.adultCount
    this.preferences = data.preferences && data.preferences.map(pref => new PreferenceModel(pref))
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      childCount: this.childCount,
      adultCount: this.adultCount,
      preferences: this.preferences.map(pref => pref.toDto())
    }
  }

  static fromDb(data = {}) {
    return new SubscriberModel({
      id: data.id,
      name: data.name,
      childCount: data.child_count,
      adultCount: data.adult_count
    })
  }
}
