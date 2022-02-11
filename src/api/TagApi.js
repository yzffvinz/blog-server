const Router = require('koa-router')
const router = new Router()
const { getMenuList, getCategories, getTags } = require('@/service/TagService')
const { jsonResponse, jsonError } = require('@/libs/response')

router
  .get('/menu', async ctx => {
    try {
      const menus = await getMenuList()
      jsonResponse(ctx, { menus })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .get('/category', async ctx => {
    try {
      const categories = await getCategories()
      jsonResponse(ctx, { categories })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .get('/tag', async ctx => {
    try {
      const tags = await getTags()
      jsonResponse(ctx, { tags })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })

module.exports = router
