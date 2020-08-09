import { AsAbstractModel } from '../common/asAbstractModel'

export class UserModel extends AsAbstractModel {
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
