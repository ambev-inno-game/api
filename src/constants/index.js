export const REGEXLATLON = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/g

export const AUTH_LEVEL = Object.freeze({
  ANONYMOUS: 'anonymous',
  LOGGED: 'logged',
  SUBSCRIPTION: 'subscription'
})

export const POSTGRE_ERROR_CODES = Object.freeze({
  UK_VIOLATION: '23505',
})
