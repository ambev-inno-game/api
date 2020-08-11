import { AmbevAbstractModel } from '../common/ambevAbstractModel'

export class PreferenceCategoryScoreModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.categoryId = data.categoryId
    this.preferenceId = data.preferenceId
    this.categoryName = data.categoryName
    this.categoryDescription = data.categoryDescription
    this.score = data.score
  }

  toDto() {
    return {
      categoryId: this.categoryId,
      preferenceId: this.preferenceId,
      categoryName: this.categoryName,
      categoryDescription: this.categoryDescription,
      score: this.score
    }
  }

  static fromDb(data = {}) {
    return new PreferenceCategoryScoreModel({
      preferenceId: data.preference_id,
      categoryId: data.id,
      name: data.title,
      description: data.category_description,
      score: data.score
    })
  }
}

export class PreferenceModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.categoryScore = data.categoryScore // PreferenceCategoryScoreModel
  }

  toDto() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      categoryScore: this.categoryScore
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