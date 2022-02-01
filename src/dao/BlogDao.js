/**
 * @file blog 集合相关 Dao 层方法
 * @author Wenzhe
 */
const quick = require('./quick')
const COLLECION_NAME = 'blog' // 涉及的集合名称 tag

// 方法绑定集合名称
const localFind = quick.find.bind(null, COLLECION_NAME)

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
  // tags, // 多个标签
  startCreatetime, // 创建时间
  endCreatetime, // 创建时间
  startUpdatetime, // 更新时间
  endUpdatetime // 更新时间
}, {
  sort = { updatetime: -1 },
  page = { pnum: 1, psize: 20 }
} = {}) {
  // 相等的条件
  const findOptions = quick.buildFindOption({ _id, author, category, tags: tag, hide: 0 })

  // 其他条件
  const extraConditions = {}
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
    ...findOptions,
    ...extraConditions
  }, { sort, page })
  return blogs
}
module.exports = {
  queryBlogs
}
