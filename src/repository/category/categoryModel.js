import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class CategoryModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.bannerLink = data.bannerLink
    this.thumbLink = data.thumbLink
  }

  toDto() {
    return {
      id: this.id,
      category: this.category,
      title: this.title,
      description: this.description,
      bannerLink: this.bannerLink,
      thumbLink: this.thumbLink
    }
  }

  static fromDb(data = {}) {
    return new CategoryModel({
      id: data.id,
      title: data.title,
      description: data.category_description,
      bannerLink: data.bannerLink,
      thumbLink: data.thumb_link
    })
  }
}