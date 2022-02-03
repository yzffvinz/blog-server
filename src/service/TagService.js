/**
 * @file tag 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryAllTags } = require('@/dao/TagDao')

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
      parent.children.push(tag)
    }
  })
  return menus
}

module.exports = {
  getMenuList
}
