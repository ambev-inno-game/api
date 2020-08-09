import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class TownhouseModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.contractExpirationDate = new Date(data.contractExpirationDate)
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      contractExpirationDate: this.contractExpirationDate,
    }
  }

  static fromDb(data = {}) {
    return new TownhouseModel({
      id: data.id,
      name: data.name,
      contractExpirationDate: data.contract_expiration_date,
    })
  }
}
