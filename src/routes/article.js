const Router = require('koa-router')
const router = new Router()
const { queryArticleList, queryArticleDetail } = require('@/service/article')
const { jsonResponse } = require('@/libs/response')

router.get('/list', async (ctx) => {
  const files = await queryArticleList()
  jsonResponse(ctx, files)
}).get('/detail', async (ctx) => {
  const { articleId } = ctx.query
  const detail = await queryArticleDetail(articleId)
  jsonResponse(ctx, detail)
})

module.exports = router
