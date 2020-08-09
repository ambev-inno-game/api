// from: https://gist.github.com/alex-shamshurin/38610574bd9d8491d955401b032954b4

export class AsAbstractModel {
  constructor() {
    // ex: this.modelProperty = data.property
    if (this.constructor === AsAbstractModel) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.toDto === AsAbstractModel.prototype.toDto) {
      throw new TypeError('Please implement abstract method toDto.')
    }
  }

  toDto() {
    // ex: return { modelProperty: this.modelProperty })
    throw new TypeError('Do not call abstract method.')
  }

  static fromDb() {
    // ex: return new AsModel({ modelProperty: dbData.model_property })
    if (this === AsAbstractModel) {
      throw new TypeError('Can not call static abstract method foo.')
    } else if (this.fromDb === AsAbstractModel.fromDb) {
      throw new TypeError('Please implement static abstract method foo.')
    } else {
      throw new TypeError('Do not call static abstract method foo from child.')
    }
  }
}
