const path = require('path')
const { basePath, homeName } = require('~/config')
const { readFilesRecursive, readFileContent, stat } = require('@/libs/file')

async function queryArticleList (category = '', type = '', tag = '') {
  try {
    const fullpath = path.join(basePath, category, type, tag)
    const fileStat = await stat(fullpath)
    const files = fileStat.isDirectory() ? await readFilesRecursive(fullpath) : []
    return files
  } catch (e) {
    console.log(e)
  }
}

async function queryArticleDetail (articleId) {
  const { content, filepath, info } = await readFileContent(articleId)
  const sections = filepath.split('/')
  const name = sections
    .splice(-1)[0]
    .replace(/\.md$/, '')
    .replace(/\b[a-z0-9A-Z-_.]+\b/gi, value => ` ${value} `)
    .trim()

  const from = sections.findIndex(section => homeName === section) + 1
  const [category, type, tag] = sections.splice(from)
  return {
    category,
    type,
    tag,
    name,
    content,
    mtime: info.mtime.getTime()
  }
}

module.exports = {
  queryArticleList,
  queryArticleDetail
}
