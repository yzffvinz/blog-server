const Router = require('koa-router')
const router = new Router()
const { getCategoryConfig } = require('@/service/menu')
const { queryArticleList, queryArticleDetail } = require('@/service/article')
const { jsonResponse } = require('@/libs/response')

router.get('/list', async (ctx) => {
  const { category, type } = ctx.query
  const intro = await getCategoryConfig(category, type)
  const files = await queryArticleList(category, type)
  jsonResponse(ctx, { intro, files })
}).get('/detail', async (ctx) => {
  const { articleId } = ctx.query
  const detail = await queryArticleDetail(articleId)
  jsonResponse(ctx, detail)
})

module.exports = router
