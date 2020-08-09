import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class ConfigModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.configKey = data.configKey
    this.configValue = data.configValue
  }

  toDto() {
    return {
      configKey: this.configKey,
      configValue: this.configValue,
    }
  }

  static fromDb(data = {}) {
    return new ConfigModel({
      configKey: data.config_key,
      configValue: data.config_value,
    })
  }
}