/**
 * @file blog 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryTags } = require('@/dao/TagDao')
const { queryBlogs, insertBlog, updateBlogById } = require('@/dao/BlogDao')

const SORT_TYPE = {
  0: { updatetime: -1 },
  1: { updatetime: 1 },
  2: { title: -1 },
  3: { title: 1 }
}

/**
  * 查询菜单信息
  * @returns menus
  */
async function getBlogById (_id, loginAuthor) {
  const blogs = await queryBlogs({ _id, loginAuthor })
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
async function getBlogList (queryParams = {}, {
  loginAuthor,
  sort = undefined,
  page = undefined
} = {}) {
  const { tag, category } = queryParams
  const rst = {}
  if (tag || category) {
    const tags = await queryTags({ name: tag || category })
    const tagInfo = tags && tags.length && tags[0]
    rst.tag = tagInfo || null
  }

  const allBlogs = await queryBlogs(queryParams, { loginAuthor })
  const blogs = await queryBlogs(queryParams, {
    loginAuthor,
    sort: sort || (tag || category
      ? SORT_TYPE[3]
      : SORT_TYPE[0]),
    page
  })
  rst.total = allBlogs.length
  rst.blogs = blogs.map(blog => Object.assign(blog, { content: '' }))

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
