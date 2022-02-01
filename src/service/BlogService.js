/**
 * @file blog 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryTags } = require('@/dao/TagDao')
const { queryBlogs } = require('@/dao/BlogDao')

/**
  * 查询菜单信息
  * @returns menus
  */
async function getBlogById (_id) {
  const blogs = await queryBlogs({ _id })
  if (blogs && blogs.length) {
    return blogs[0]
  }
  return null
}
/**
 * 查询博客列表
 * @param {*} 查询条件 标题, 分类，标签
 * @returns blogs
 */
async function getBlogList ({ title, category, tag } = {}) {
  const tags = await queryTags({ name: tag || category })
  const tagInfo = tags && tags.length && tags[0]

  const blogs = await queryBlogs({ title, category, tag })
  return {
    tag: tagInfo || null,
    blogs
  }
}

module.exports = {
  getBlogById,
  getBlogList
}
