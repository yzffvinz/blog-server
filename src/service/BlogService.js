/**
 * @file blog 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryTags } = require('@/dao/TagDao')
const { queryBlogs, insertBlog, updateBlogById } = require('@/dao/BlogDao')

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
  const rst = {}
  if (tag || category) {
    const tags = await queryTags({ name: tag || category })
    const tagInfo = tags && tags.length && tags[0]
    rst.tag = tagInfo || null
  }
  rst.blogs = await queryBlogs({ title, category, tag })

  return rst
}

async function addBlog (blogDetail) {
  return insertBlog(blogDetail)
}

async function modifyBlog (blogDetail) {
  return updateBlogById(blogDetail)
}

module.exports = {
  getBlogById,
  getBlogList,
  addBlog,
  modifyBlog
}
