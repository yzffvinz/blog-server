const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  ctx.body = 'article list'
}).get('/detail', async (ctx) => {
  ctx.body = 'article detail'
})

module.exports = router
