const { queryArticleList, queryArticleDetail } = require('@/service/article')
const Router = require('koa-router')
const router = new Router()

router.get('/list', async (ctx) => {
  const files = await queryArticleList()
  ctx.set('Content-Type', 'application/json')
  ctx.body = JSON.stringify({ files })
}).get('/detail', async (ctx) => {
  const { articleId } = ctx.query
  const detail = await queryArticleDetail(articleId)
  ctx.set('Content-Type', 'application/json')
  ctx.body = JSON.stringify({ detail })
})

module.exports = router
