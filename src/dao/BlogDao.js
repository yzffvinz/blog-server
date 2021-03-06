/**
 * @file blog 集合相关 Dao 层方法
 * @author Wenzhe
 */
const quick = require('./quick')
const COLLECION_NAME = 'blog' // 涉及的集合名称 tag

// 方法绑定集合名称
const localFind = quick.find.bind(null, COLLECION_NAME)
const localInsertOne = quick.insertOne.bind(null, COLLECION_NAME)
const localUpdate = quick.updateById.bind(null, COLLECION_NAME)
/**
 * 查询博客
 * @param {*} 查询条件
 * @param {*} 排序和页面
 * @returns blogs
 */
async function queryBlogs ({
  _id, // ObjectId
  title, // 模糊查询：标题
  author, // 作者
  category, // 分类
  tag, // 单个标签
  startCreatetime, // 创建时间
  endCreatetime, // 创建时间
  startUpdatetime, // 更新时间
  endUpdatetime, // 更新时间
  hide // 是否隐藏
}, {
  loginAuthor = '', // 登录用户
  sort, // { updatetime: -1 }
  page // { pnum: 1, psize: 50 }
} = {}) {
  // 相等的条件
  const findConditions = quick.buildFindOption({ _id, author, category, tags: tag, hide })

  // 其他条件
  const extraConditions = {
    $or: [{ hide: 0 }]
  }

  // 文章作者可以查看自己的隐藏内容
  if (loginAuthor) {
    extraConditions.$or.push({ author: loginAuthor })
  }

  // 标题模糊查询
  if (title) {
    extraConditions.title = { $regex: title }
  }
  // 创建时间范围
  if (startCreatetime || endCreatetime) {
    extraConditions.createtime = {}
    startCreatetime && (extraConditions.createtime.$gte = startCreatetime)
    endCreatetime && (extraConditions.createtime.$lte = endCreatetime)
  }
  // 更新时间范围
  if (startUpdatetime || endUpdatetime) {
    extraConditions.updatetime = {}
    startUpdatetime && (extraConditions.createtime.$gte = startUpdatetime)
    endUpdatetime && (extraConditions.createtime.$lte = endUpdatetime)
  }

  // 查询
  const blogs = await localFind({
    ...findConditions,
    ...extraConditions
  }, { page, sort })
  return blogs
}

async function insertBlog ({
  title,
  description,
  author,
  cover,
  content = '',
  category,
  tags,
  hide = 0
}) {
  const nowStamp = Date.now()
  return localInsertOne({
    title,
    cover,
    description,
    author,
    content,
    category,
    tags,
    createtime: nowStamp,
    updatetime: nowStamp,
    hide
  })
}

async function updateBlogById ({
  _id,
  title,
  cover,
  description,
  author,
  category,
  tags,
  content,
  hide = 0,
  loginAuthor
}) {
  return localUpdate({
    _id,
    title,
    cover,
    description,
    author,
    category,
    tags,
    content,
    updatetime: Date.now(),
    hide
  }, {
    author: loginAuthor
  })
}

async function deleteBlogById (_id) {
  return localUpdate({
    _id,
    hide: 1
  })
}

module.exports = {
  queryBlogs,
  insertBlog,
  updateBlogById,
  deleteBlogById
}
