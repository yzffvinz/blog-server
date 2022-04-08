const { jsonResponse, jsonError } = require('@/libs/response')
const { RESPONSE_CODES } = require('@/common/constants')
const Router = require('koa-router')
const router = new Router()
const { list, options, add, modify, del } = require('@/service/LowcodeService')
const { verifyToken } = require('@/libs/jwt')

router
  .get('/list', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await list(ctx.params.domain, ctx.query)
    jsonResponse(ctx, rst)
  })
  .post('/list', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await list(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .get('/options', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await options(ctx.params.domain, ctx.query)
    jsonResponse(ctx, rst)
  })
  .post('/add', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await add(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .post('/modify', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await modify(ctx.params.domain, ctx.request.body)
    jsonResponse(ctx, rst)
  })
  .post('/delete/:id', async ctx => {
    const token = verifyToken(ctx)
    if (!token.token) {
      return jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
    }
    const rst = await del(ctx.params.domain, ctx.params.id)
    jsonResponse(ctx, rst)
  })

module.exports = router
