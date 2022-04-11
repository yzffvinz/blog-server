const { jsonError } = require('@/libs/response')
const { RESPONSE_CODES } = require('@/common/constants')
const { verifyToken } = require('@/libs/jwt')

module.exports = exports = async (ctx, next) => {
  const token = verifyToken(ctx)
  const loginAuthor = (token.token && token.data.username) || ''
  if (!loginAuthor) {
    jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
  } else {
    await next()
  }
}
