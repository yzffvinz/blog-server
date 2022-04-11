const { jsonResponse } = require('@/libs/response')
const Router = require('koa-router')
const router = new Router()
const { list, options, add, modify, del } = require('@/service/LowcodeService')

router
  .get('/list', async ctx => {
    const rst = await list(ctx.params.domain, ctx.query)
    jsonResponse(ctx, rst)
  })
  .post('/list', async ctx => {
    const rst = await list(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .get('/options', async ctx => {
    const rst = await options(ctx.params.domain, ctx.query)
    jsonResponse(ctx, rst)
  })
  .post('/add', async ctx => {
    const rst = await add(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .post('/modify', async ctx => {
    const rst = await modify(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .post('/delete/:id', async ctx => {
    const rst = await del(ctx.params.domain, ctx.params.id)
    jsonResponse(ctx, rst)
  })

module.exports = router
