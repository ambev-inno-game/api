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
    this.questionId = data.questionId
    this.preference = data.preference
    this.imgLink = data.imgLink
    this.categoryScore = data.categoryScore // [ PreferenceCategoryScoreModel ]
  }

  toDto() {
    return {
      id: this.id,
      questionId: this.questionId,
      preference: this.preference,
      imgLink: this.imgLink,
      categoryScore: this.categoryScore
    }
  }

  static fromDb(data = {}) {
    return new PreferenceModel({
      id: data.id,
      questionId: data.question_id,
      preference: data.preference,
      imgLink: data.img_link
    })
  }
}

export class PreferenceQuestionModel extends AmbevAbstractModel {
  constructor(data = {}) {
    super(data)
    this.id = data.id
    this.title = data.title
    this.question = data.question
    this.options = data.options // [ PreferenceModel ]
  }

  toDto() {
    return {
      id: this.id,
      title: this.title,
      question: this.question
    }
  }

  static fromDb(data = {}) {
    return new PreferenceQuestionModel({
      id: data.id,
      title: data.title,
      question: data.question
    })
  }
}
