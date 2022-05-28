const Router = require('koa-router')
const router = new Router()
const { jsonResponse } = require('@/libs/response')
const { logBaecon, getPV } = require('@/service/BaeconService')

router
  .get('/pv', async ctx => {
    return await jsonResponse(ctx, { count: await getPV('site') })
  })
  .get('/pvdetail', async ctx => {
    return await jsonResponse(ctx, {
      count: await getPV('detail', { id: ctx.query.id })
    })
  })
  .get('/pvlist', async ctx => {
    return await jsonResponse(ctx, {
      count: await getPV('list', { tag: ctx.query.tag })
    })
  })
  .post('/:page', async ctx => {
    const page = ctx.params.page
    const { fullPath, ua, data: dataJson } = ctx.request.body
    const data = dataJson ? JSON.parse(dataJson) : {}
    await logBaecon({ page, fullPath, ua, data })
    jsonResponse(ctx)
  })

module.exports = router
