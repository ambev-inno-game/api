import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class PreferenceModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.description = data.description
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    }
  }

  static fromDb(data = {}) {
    return new PreferenceModel({
      id: data.id,
      name: data.preference_name,
      description: data.preference_description
    })
  }
}