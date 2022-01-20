const Router = require('@koa/router')
const router = new Router()

const menu = require('./menu')
const article = require('./article')
const trending = require('./trending')

router.use('/api/menu', menu.routes(), menu.allowedMethods())
router.use('/api/article', article.routes(), article.allowedMethods())
router.use('/api/trending', trending.routes(), trending.allowedMethods())

module.exports = router
