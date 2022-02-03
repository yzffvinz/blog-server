const Router = require('@koa/router')
const router = new Router()

const user = require('./UserApi')
const tag = require('./TagApi')
const blog = require('./BlogApi')

router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/tag', tag.routes(), tag.allowedMethods())
router.use('/api/blog', blog.routes(), blog.allowedMethods())

module.exports = router
