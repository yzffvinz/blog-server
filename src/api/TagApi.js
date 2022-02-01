const Router = require('koa-router')
const router = new Router()
const { getMenuList } = require('@/service/TagService')
const { jsonResponse, jsonError } = require('@/libs/response')

router
  .get('/list', async ctx => {
    try {
      const menus = await getMenuList()
      jsonResponse(ctx, { menus })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })

module.exports = router
