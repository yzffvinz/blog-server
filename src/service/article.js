const path = require('path')
const { basePath } = require('~/config')
const { readFilesRecursive, readFileContent } = require('../lib/file')

function queryArticleList () {
  const fullpath = path.join(basePath)
  return readFilesRecursive(fullpath)
}

function queryArticleDetail (articleId) {
  return readFileContent(articleId)
}

module.exports = {
  queryArticleList,
  queryArticleDetail
}
