// const path = require('path')
const path = require('path')
const { basePath, configFileName } = require('~/config')
const { readdir } = require('@/libs/file')

async function getCategoryConfig (category, type) {
  try {
    const configPath = path.join(basePath, category, configFileName)
    const categoryConfig = require(configPath)
    return categoryConfig.subjects.find(subject => subject.path === type)
  } catch {
    return {}
  }
}

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
  getCategoryConfig,
  getMenu
}
