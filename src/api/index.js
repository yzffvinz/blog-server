const Router = require('@koa/router')
const router = new Router()

const user = require('./UserApi')
const tag = require('./TagApi')
const blog = require('./BlogApi')
const lowcode = require('./LowcodeApi')

router.use('/api/user', user.routes(), user.allowedMethods())
router.use('/api/tag', tag.routes(), tag.allowedMethods())
router.use('/api/blog', blog.routes(), blog.allowedMethods())
router.use('/api/lc/:domain', lowcode.routes(), lowcode.allowedMethods())

module.exports = router
