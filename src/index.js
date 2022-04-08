require('module-alias/register')

const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const wrapper = require('./middleware/wrapper')
const logger = require('./middleware/logger')
const cors = require('./middleware/cors')
const apis = require('./api/index')

app.use(bodyParser())
app.use(wrapper)
app.use(logger)
app.use(cors)
app.use(apis.routes()).use(apis.allowedMethods())

app.listen(3000)
