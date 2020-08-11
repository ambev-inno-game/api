export const REGEXLATLON = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g

export const AUTH_LEVEL = Object.freeze({
  ANONYMOUS: 'anonymous',
  LOGGED: 'logged',
  SUBSCRIPTION: 'subscription'
})

export const POSTGRE_ERROR_CODES = Object.freeze({
  UK_VIOLATION: '23505',
})

export const CATEGORIES = Object.freeze({
  REFRIGERANTES: 'REFRIGERANTES',
  SUCOS: 'SUCOS',
  ISOTONICOS: 'ISOTONICOS',
  ENERGETICOS: 'ENERGETICOS',
  AGUAECHA: 'AGUAECHA'
})

export const PREFERENCES = Object.freeze({
  FITNESS: {
    name: 'Fitness',
    categoryPoints: [
      { categoryName: CATEGORIES.ISOTONICOS, score: 3 },
      { categoryName: CATEGORIES.SUCOS, score: 2 },
      { categoryName: CATEGORIES.AGUAECHA, score: 1 }
    ]
  },
  NATURAL: {
    name: 'Natural',
    categoryPoints: [
      { categoryName: CATEGORIES.SUCOS, score: 3 },
      { categoryName: CATEGORIES.AGUAECHA, score: 2 }
    ]
  },
  ENERGIA: {
    name: 'Energia',
    categoryPoints: [
      { categoryName: CATEGORIES.ENERGETICOS, score: 3 },
      { categoryName: CATEGORIES.REFRIGERANTES, score: 2 },
      { categoryName: CATEGORIES.ISOTONICOS, score: 1 }
    ]
  },
  SWEET: {
    name: 'Sweet',
    categoryPoints: [
      { categoryName: CATEGORIES.REFRIGERANTES, score: 3 },
      { categoryName: CATEGORIES.SUCOS, score: 2 },
    ]
  },
  KIDS: {
    name: 'Kids',
    categoryPoints: [
      { categoryName: CATEGORIES.SUCOS, score: 3 },
      { categoryName: CATEGORIES.REFRIGERANTES, score: 1 }
    ]
  }
})
