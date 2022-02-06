require('module-alias/register')

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const apis = require('./api/index')

app.use(bodyParser())

app.use(apis.routes()).use(apis.allowedMethods())

app.listen(3000)
