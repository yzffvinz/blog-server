const Router = require('koa-router')
const router = new Router()
const { getBlogById, getBlogList } = require('@/service/BlogService')
const { jsonResponse, jsonError } = require('@/libs/response')

router
  .get('/detail', async ctx => {
    try {
      const { _id } = ctx.query
      const blog = await getBlogById(_id)
      jsonResponse(ctx, { blog })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .get('/list', async ctx => {
    try {
      const { title, category, tag } = ctx.query
      const blogs = await getBlogList({ title, category, tag })
      jsonResponse(ctx, { blogs })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })

module.exports = router
