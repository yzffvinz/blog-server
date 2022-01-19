const path = require('path')
const { basePath } = require('~/config')
const { readFilesRecursive, readFileContent } = require('@/libs/file')

async function queryArticleList () {
  const fullpath = path.join(basePath)
  const files = await readFilesRecursive(fullpath)
  return {
    files
  }
}

async function queryArticleDetail (articleId) {
  const detail = await readFileContent(articleId)
  return {
    detail
  }
}

module.exports = {
  queryArticleList,
  queryArticleDetail
}
