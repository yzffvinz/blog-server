require('module-alias/register')
require('./warmup')

const Koa = require('koa')
const app = new Koa()
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
const apis = require('./api/index')

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())
app.use(apis.routes()).use(apis.allowedMethods())

app.listen(3000)
