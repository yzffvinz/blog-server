
const Router = require('koa-router')
const detail = new Router()

detail.get('/article', async (ctx) => {
  ctx.body = '/api/detail/article'
}).get('/trending', async (ctx) => {
  ctx.body = '/api/detail/trending'
})

module.exports = detail
