/**
 * @file mongodb 操作接口
 */
const { MongoClient, ObjectId } = require('mongodb')
const connect = MongoClient.connect
const dbScheme = 'mongodb://localhost:27017'

/**
 * 生成集合连接实例
 * @param {*} collectionName 集合名称
 * @returns {
 *    client: 连接，
 *    collection: 集合连接
 * }
 */
async function __getConnection (collectionName) {
  return new Promise((resolve, reject) => {
    connect(dbScheme).then(client => {
      const db = client.db('blog-db')
      const collection = db.collection(collectionName)
      if (!collection) {
        client.close()
        reject(new Error('connect collection failed'))
        return
      }
      resolve({
        done: () => client.close(),
        collection
      })
    }, err => reject(err))
  })
}

/**
 * 返回 ObjectId 的包装类
 * @param {*} id
 * @returns
 */
function __wrapObjectId (id) {
  if (!id) { throw new Error('_id is null') }
  if (!(id instanceof ObjectId)) {
    id = new ObjectId(id)
  }
  return id
}

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
  const { done, collection } = await __getConnection(collectionName)
  try {
    // 查询
    if (findOption._id) {
      findOption._id = __wrapObjectId(findOption._id)
    }
    let semi = collection.find(findOption)
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
  } finally {
    done() // 调用 done 用于关闭连接
  }
}

/**
 * 单条插入
 * @param {*} collectionName
 * @param {*} item
 */
async function insertOne (collectionName, item) {
  const { done, collection } = await __getConnection(collectionName)
  try {
    return await collection.insertOne(item)
  } finally {
    done() // 调用 done 用于关闭连接
  }
}

/**
 *
 * @param {*} collectionName
 * @param {*} rows
 * @returns
 */
async function insertMany (collectionName, items) {
  const { done, collection } = await __getConnection(collectionName)
  try {
    return await collection.insertMany(items)
  } finally {
    done() // 调用 done 用于关闭连接
  }
}

/**
 * 根据 _id 更新条目
 * @param {*} collectionName
 * @param {*} item
 */
async function updateById (collectionName, item) {
  const { done, collection } = await __getConnection(collectionName)
  try {
    const copy = { ...item }
    // 确保 objectId: 不为空且为一个 ObjectId 的实例
    const _id = __wrapObjectId(item._id)
    delete copy._id

    // 执行更新
    return await collection.updateOne({ _id }, { $set: copy })
  } finally {
    done() // 调用 done 用于关闭连接
  }
}

/**
 *
 */
async function deleteById (collectionName, id) {
  const { done, collection } = await __getConnection(collectionName)
  try {
    const _id = __wrapObjectId(id)
    // 执行更新
    return await collection.deleteOne({ _id })
  } finally {
    done() // 调用 done 用于关闭连接
  }
}

module.exports = {
  buildFindOption,
  find,
  insertOne,
  insertMany,
  updateById,
  deleteById
}
