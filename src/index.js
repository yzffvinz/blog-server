require('module-alias/register')

const Koa = require('koa')
const app = new Koa()
const errorBoundary = require('./middleware/errorBoundary')
const koaBody = require('koa-body')
const logger = require('./middleware/logger')
const cors = require('./middleware/cors')
const apis = require('./api/index')

app.use(errorBoundary)
app.use(cors)
app.use(koaBody({
  multipart: true
}))
app.use(logger)
app.use(apis.routes()).use(apis.allowedMethods())

app.listen(3000)
