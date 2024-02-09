const { executeQuery, __wrapObjectId } = require('./connection')

/**
 * 创建查询对象
 * @param {*} raw
 * @returns findOptions
 */
function buildFindOption (raw) {
  const isDef = v => !([undefined, null].includes(v))
  const findOption = {}
  Object.keys(raw).forEach(k => {
    isDef(raw[k]) && Object.assign(findOption, { [k]: raw[k] })
  })
  return findOption
}

/**
 * 查询
 * @param {*} collectionName 集合名称
 * @param {*} findOption 查询条件
 * @param {*} options {
 *    page: {
 *      size: 每页大小，默认为 20
 *      page: 当前页码，从 0 开始
 *    },
 *    sort: {
 *      [KEY]: 1 升序，-1 降序
 *    }
 * }
 * @returns 查询结果
 */
async function find (collectionName, findOption = {}, options = {}) {
  // 查询
  if (findOption._id) {
    findOption._id = __wrapObjectId(findOption._id)
  }
  let semi = await executeQuery(collectionName, async collection =>
    collection.find(findOption)
  )
  // 排序 + 分页逻辑
  const { sort, page } = options
  if (sort) {
    semi = semi.sort(sort)
  }
  if (page) {
    let { pnum, psize } = page
    pnum = pnum ?? 1
    psize = psize ?? 10
    const skip = (pnum - 1) * psize
    semi = semi.skip(skip).limit(psize)
  }
  return await semi.toArray()
}

/**
 * 单条插入
 * @param {*} collectionName
 * @param {*} item
 */
async function insertOne (collectionName, item) {
  return await executeQuery(collectionName, async collection =>
    collection.insertOne(item)
  )
}

/**
 *
 * @param {*} collectionName
 * @param {*} rows
 * @returns
 */
async function insertMany (collectionName, items) {
  return await executeQuery(collectionName, async collection =>
    collection.insertMany(items)
  )
}

/**
 * 根据 _id 更新条目
 * @param {*} collectionName
 * @param {*} item
 */
async function updateById (collectionName, item, otherCondition = {}) {
  const copy = { ...item }
  // 确保 objectId: 不为空且为一个 ObjectId 的实例
  const _id = __wrapObjectId(item._id)
  delete copy._id
  return await executeQuery(collectionName, async collection =>
    collection.updateOne({ _id, ...otherCondition }, { $set: copy })
  )
}

/**
 *
 */
async function deleteById (collectionName, id) {
  const _id = __wrapObjectId(id)
  // 执行更新
  return await executeQuery(collectionName, async collection =>
    collection.deleteOne({ _id })
  )
}

module.exports = {
  buildFindOption,
  find,
  insertOne,
  insertMany,
  updateById,
  deleteById
}
