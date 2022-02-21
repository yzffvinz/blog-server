const Router = require('koa-router')
const router = new Router()
const { getBlogById, getBlogList, addBlog, modifyBlog } = require('@/service/BlogService')
const { jsonResponse, jsonError } = require('@/libs/response')
const { RESPONSE_CODES } = require('@/common/constants')
const { verifyToken } = require('@/libs/jwt')

router
  .get('/detail', async ctx => {
    try {
      const { _id } = ctx.query
      const token = verifyToken(ctx)
      const loginAuthor = (token.token && token.data.username) || ''
      const blog = await getBlogById(_id, loginAuthor)
      jsonResponse(ctx, { blog })
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .get('/list', async ctx => {
    try {
      const { title, category, tag } = ctx.query
      const token = verifyToken(ctx)
      const loginAuthor = (token.token && token.data.username) || ''
      const blogs = await getBlogList({ title, category, tag, loginAuthor })
      jsonResponse(ctx, blogs)
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .post('/add', async ctx => {
    try {
      const token = verifyToken(ctx)
      if (!token.token) {
        jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
      } else {
        const rst = await addBlog({ ...ctx.request.body, author: token.data.username })
        jsonResponse(ctx, rst)
      }
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })
  .post('/modify', async ctx => {
    try {
      const token = verifyToken(ctx)
      if (!token.token) {
        jsonError(ctx, RESPONSE_CODES.LOGIN_NOT)
      } else {
        const rst = await modifyBlog({ ...ctx.request.body, loginAuthor: token.data.username })
        jsonResponse(ctx, rst)
      }
    } catch (e) {
      console.log(e)
      jsonError(ctx)
    }
  })

module.exports = router
