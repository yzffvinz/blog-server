const fs = require('fs')
const path = require('path')
const promisify = require('./promisify')
const md5 = require('md5-node')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)

const cache = {}

async function readFilesRecursive (dirpath, suffix = '.md') {
  const rst = []
  const dirs = [dirpath]
  while (dirs.length) {
    const curDir = dirs.pop()
    const files = await readdir(curDir)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const filePath = path.join(curDir, file)
      if (filePath.includes('node_modules')) continue
      const fileStat = await stat(filePath)
      if (fileStat.isDirectory()) {
        dirs.push(filePath)
      } else if (filePath.endsWith(suffix)) {
        const articleId = md5(filePath)
        cache[articleId] = filePath
        rst.push({
          name: file.replace('.md', ''),
          articleId: articleId
        })
      }
    }
  }

  return rst
}

async function readFileContent (fileId) {
  const filepath = cache[fileId]
  if (!filepath) return
  const content = await readFile(filepath, 'utf-8')
  return {
    filepath,
    content
  }
}

module.exports = {
  readFileContent,
  readFilesRecursive,
  readdir
}
