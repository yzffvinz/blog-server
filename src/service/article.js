const path = require('path')
const { basePath } = require('~/config')
const { readFilesRecursive, readArticleDetail } = require('../lib/file')

function queryArticleList () {
  const fullpath = path.join(basePath)
  return readFilesRecursive(fullpath)
}

function queryArticleDetail (articlePath) {
  return readArticleDetail(articlePath)
}

module.exports = {
  queryArticleList,
  queryArticleDetail
}
