import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class UserModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.name = data.name
    this.email = data.email
    this.password = data.password
  }

  toDto() {
    return {
      name: this.name,
      email: this.email,
    }
  }
}