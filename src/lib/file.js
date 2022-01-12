const fs = require('fs')
const path = require('path')
const promisify = require('./promisify')

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const readFile = promisify(fs.readFile)

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
        rst.push({
          name: file,
          path: filePath
        })
      }
    }
  }

  return rst
}

async function readArticleDetail (filePath) {
  return readFile(filePath, 'utf-8')
}

module.exports = {
  readArticleDetail,
  readFilesRecursive
}
