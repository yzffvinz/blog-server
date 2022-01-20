// const path = require('path')
const path = require('path')
const { basePath, configFileName } = require('~/config')
const { readdir } = require('@/libs/file')

async function getMenu () {
  const files = await readdir(basePath)
  const menus = []
  files.forEach(file => {
    const filepath = path.join(basePath, file, configFileName)
    const config = require(filepath)
    menus.push(config)
  })
  return menus
}

module.exports = {
  getMenu
}
