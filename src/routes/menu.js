const Router = require('koa-router')
const router = new Router()
const { jsonResponse } = require('@/libs/response')
const { getMenu } = require('@/service/menu')

router.get('/list', async (ctx) => {
  const menus = await getMenu()
  jsonResponse(ctx, menus)
})

module.exports = router
