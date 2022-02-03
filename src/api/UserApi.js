const Router = require('koa-router')
const router = new Router()
// const md5 = require('node-md5')
const { jsonResponse, jsonError } = require('@/libs/response')
const { encrypt } = require('@/libs/jwt')
const { verifyUser } = require('@/service/UserService')
const { RESPONSE_CODES } = require('@/common/constants')

router
  .post('/login', async ctx => {
    try {
      const isValid = await verifyUser(ctx.request.body)
      if (isValid) {
        ctx.cookies.set('token', encrypt({ username: ctx.request.body.username }))
        jsonResponse(ctx)
      } else {
        jsonError(ctx, RESPONSE_CODES.LOGIN_FAILED)
      }
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })

module.exports = router
