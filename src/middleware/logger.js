const LOG = require('@/libs/logger')

module.exports = exports = async (ctx, next) => {
  const start = Date.now()
  const weakId = Math.random() * 1000 >> 0
  LOG.info(`request-${start}-${weakId}: params=${JSON.stringify(ctx.params || null)}, query=${JSON.stringify(ctx.query || null)}, body = ${JSON.stringify(ctx.request.body || null)}`)
  await next()
  const ms = Date.now() - start
  LOG.info(`response-${start}-${weakId}: exec-duration ${ms}`)
}
