import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class ProductModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.category = data.category
    this.title = data.title
    this.description = data.description
    this.imageLink = data.imageLink
    this.thumbLink = data.thumbLink
    this.price = data.price
    this.litres = data.litres
  }

  toDto() {
    return {
      id: this.id,
      category: this.category,
      title: this.title,
      description: this.description,
      imageLink: this.imageLink,
      thumbLink: this.thumbLink,
      price: this.price,
      litres: this.litres
    }
  }

  static fromDb(data = {}) {
    return new ProductModel({
      id: data.id,
      category: data.category,
      title: data.title,
      description: data.product_description,
      imageLink: data.image_link,
      thumbLink: data.thumb_link,
      price: data.price,
      litres: data.litres
    })
  }
}