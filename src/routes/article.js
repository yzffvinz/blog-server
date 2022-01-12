const { queryArticleList, queryArticleDetail } = require('@/service/article')
const Router = require('koa-router')
const router = new Router()

// function tpl (files) {
//   return files.map(file => `<a href="/api/article/detail?articlePath=${file.path}">${file.name}</a>`).join('<br>')
// }

router.get('/list', async (ctx) => {
  const files = await queryArticleList()
  // ctx.body = tpl(files)
  ctx.set('Content-Type', 'application/json')
  ctx.body = JSON.stringify({ files })
}).get('/detail', async (ctx) => {
  const { articlePath } = ctx.query
  const detail = await queryArticleDetail(articlePath)
  ctx.set('Content-Type', 'application/json')
  ctx.body = JSON.stringify({ detail })
})

module.exports = router
