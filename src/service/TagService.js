/**
 * @file tag 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryAllTags, queryTags } = require('@/dao/TagDao')

/**
 * 查询菜单信息
 * @returns menus
 */
async function getMenuList () {
  const tags = await queryAllTags()
  const menus = []
  tags.forEach(tag => {
    if (!tag.parent) {
      menus.push({
        ...tag,
        children: []
      })
    } else {
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
  const categories = await queryTags({ parent: '' })
  return categories
}
/**
 * 查询所有标签
 * @returns tags
 */
async function getTags () {
  const tags = await queryTags({ parent: { $ne: '' } })
  return tags
}

module.exports = {
  getMenuList,
  getCategories,
  getTags
}
