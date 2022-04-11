/**
 * @file tag 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryList } = require('@/dao/LowcodeDao')

const defaultParams = [[], {
  sort: [
    { orderBy: 'order' }
  ]
}]

/**
 * 查询菜单信息
 * @returns menus
 */
async function getMenuList () {
  const categories = await queryList('category', ...defaultParams)
  const tags = await queryList('tag', ...defaultParams)
  const menus = categories.map(category => {
    return {
      ...category,
      children: []
    }
  })
  tags.forEach(tag => {
    if (tag.parent) {
      const parent = menus.find(menu => menu.name === tag.parent)
      if (parent && parent.children) {
        parent.children.push(tag)
      }
    }
  })
  return menus
}

/**
 * 查询所有类别
 * @returns categories
 */
async function getCategories () {
  const categories = await queryList('category', ...defaultParams)
  return categories
}
/**
 * 查询所有标签
 * @returns tags
 */
async function getTags () {
  const tags = await queryList('tag', ...defaultParams)
  return tags
}

module.exports = {
  getMenuList,
  getCategories,
  getTags
}
