const Router = require('@koa/router')
const router = new Router()
const article = require('./article')
const trending = require('./trending')

router.use('/api/article', article.routes(), article.allowedMethods())
router.use('/api/trending', trending.routes(), trending.allowedMethods())

module.exports = router
