const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  ctx.body = 'trending list'
})

module.exports = router
