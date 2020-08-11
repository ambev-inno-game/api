import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class ProductModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.categoryId = data.categoryId
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
      categoryId: this.categoryId,
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
      categoryId: data.category_id,
      title: data.title,
      description: data.product_description,
      imageLink: data.image_link,
      thumbLink: data.thumb_link,
      price: data.price,
      litres: data.litres
    })
  }
}