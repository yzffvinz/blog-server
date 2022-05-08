const LOG = require('@/libs/logger')
const { jsonError } = require('@/libs/response')

module.exports = exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    LOG.warn(e.message)
    jsonError(ctx)
  }
}
