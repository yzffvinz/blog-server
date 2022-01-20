const path = require('path')
const { basePath, homeName } = require('~/config')
const { readFilesRecursive, readFileContent } = require('@/libs/file')

async function queryArticleList (category = '', type = '', tag = '') {
  const fullpath = path.join(basePath, category, type, tag)
  const files = await readFilesRecursive(fullpath)
  return {
    files
  }
}

async function queryArticleDetail (articleId) {
  const { content, filepath } = await readFileContent(articleId)
  const sections = filepath.split('/')
  const name = sections
    .splice(-1)[0]
    .replace(/\b[a-z-_.]+\b/gi, value => ` ${value} `)
    .trim()

  const from = sections.findIndex(section => homeName === section) + 1
  const [category, type, tag] = sections.splice(from)
  return {
    category,
    type,
    tag,
    name,
    content
  }
}

module.exports = {
  queryArticleList,
  queryArticleDetail
}
