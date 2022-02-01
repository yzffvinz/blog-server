/**
 * @file tag 集合相关 Dao 层方法
 * @author Wenzhe
 */
const quick = require('./quick')
const COLLECION_NAME = 'tag' // 涉及的集合名称 tag

// 方法绑定集合名称
const localFind = quick.find.bind(null, COLLECION_NAME)

/**
 * 查询分类
 * @returns 博客分类（一级标签）
 */
async function queryAllCategories () {
  const categories = await localFind({ parent: null }, { order: 1 })
  return categories
}

/**
 * 查询某个分类下的标签
 * @param {*} parent 分类名称
 * @returns tags
 */
async function queryTagsByCategory (parent = '') {
  const tags = await localFind({ parent }, { order: 1 })
  return tags
}

/**
 * 查询所有的标签
 * @returns allTags
 */
async function queryAllTags () {
  const allTags = await localFind({}, { parent: 1, order: 1 })
  return allTags
}

async function queryTags ({ name, _id } = {}) {
  const options = quick.buildFindOption({ name, _id })
  const tags = await localFind(options)
  return tags
}

module.exports = {
  queryAllCategories,
  queryTagsByCategory,
  queryAllTags,
  queryTags
}
