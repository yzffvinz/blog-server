const Router = require('koa-router')
const router = new Router()
// const md5 = require('node-md5')
const { jsonResponse, jsonError } = require('@/libs/response')
const { encrypt } = require('@/libs/jwt')
const { verifyUser } = require('@/service/UserService')
const { RESPONSE_CODES } = require('@/common/constants')
const { verifyToken } = require('@/libs/jwt')

router
  .get('/status', async ctx => {
    try {
      const token = verifyToken(ctx)
      jsonResponse(ctx, {
        isLogin: token.token,
        userInfo: token.data
      })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .post('/login', async ctx => {
    try {
      const userInfo = await verifyUser(ctx.request.body)
      if (userInfo) {
        ctx.cookies.set('token', encrypt({ ...userInfo }))
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
