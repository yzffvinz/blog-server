const LOG = require('@/libs/logger')
const { MongoClient, ObjectId } = require('mongodb')
const connect = MongoClient.connect
const dbScheme = 'mongodb://localhost:27017'
const { WHERE_OPS, MONGO_COMPARE_OPS_MAP, WHERE_TYPES } = require('./Constants')

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

function __wrapObjectId (id) {
  if (!id) { throw new Error('_id is null') }
  if (!(id instanceof ObjectId)) {
    id = ObjectId(id)
  }
  return id
}

/**
 * amis 存在部分类型相关的 bug
 * 这里对于 createtime updatetime 由字符串转为数字类型
 */
function __transformTime (item) {
  ['createtime', 'updatetime'].forEach(key => {
    if (item[key]) {
      item[key] = +item[key]
    }
  })
}

module.exports = {
  async queryList (domain, where = [], options = {}) {
    const { done, collection } = await __getConnection(domain)
    try {
      // 处理查询参数
      const whereOptions = where.reduce((sum, cur) => {
        // mongoId 需要包一下
        if (cur.field === '_id') {
          cur.val = __wrapObjectId(cur.val)
        }

        const { op, val, field, type } = cur

        // 类型处理
        let value = val
        if (type === WHERE_TYPES.BOOLEAN) {
          value = val === true || val === 'true'
        } else if (type === WHERE_TYPES.NUMBER) {
          value = +val
        }

        let whereOption = { [field]: value }

        if (MONGO_COMPARE_OPS_MAP[op]) {
          whereOption = {
            [field]: {
              [MONGO_COMPARE_OPS_MAP[op]]: value
            }
          }
        } else if (op === WHERE_OPS.RANGE) {
          const [min, max] = value.split(',')
          whereOption = {
            [field]: {
              $gte: +min,
              $lte: +max
            }
          }
        }

        return Object.assign(sum, whereOption)
      }, {})

      LOG.info(whereOptions)
      const rows = collection.find(whereOptions)

      // 处理分页
      if (options.page) {
        let { page, perPage } = options.page
        page = +page ?? 1
        perPage = +perPage ?? 10
        const skip = (page - 1) * perPage
        rows.skip(skip).limit(perPage)
      }

      // 处理排序
      if (options.sort) {
        const sorts = options.sort
        const sort = sorts.reduce((sum, { orderBy, orderDir }) => {
          return Object.assign(sum, { [orderBy]: orderDir === 'desc' ? -1 : 1 })
        }, {})
        rows.sort(sort)
      }

      return await rows.toArray()
    } catch (e) {
      console.log(e)
    } finally {
      done()
    }
  },
  async addDocument (domain, item) {
    const { done, collection } = await __getConnection(domain)
    try {
      const now = Date.now()
      return await collection.insertOne({ ...item, updatetime: now, createtime: now, version: 1 })
    } finally {
      done() // 调用 done 用于关闭连接
    }
  },
  async modifyDocument (domain, item) {
    const { done, collection } = await __getConnection(domain)
    try {
      const _id = __wrapObjectId(item._id)
      __transformTime(item)
      // const now = Date.now()
      // const copy = { ...item, updatetime: now }
      const copy = { ...item }
      delete copy._id

      return await collection.updateOne({ _id }, { $set: copy })
    } finally {
      done() // 调用 done 用于关闭连接
    }
  },
  async delDocument (domain, id) {
    const { done, collection } = await __getConnection(domain)
    try {
      const _id = __wrapObjectId(id)
      return await collection.deleteOne({ _id })
    } finally {
      done() // 调用 done 用于关闭连接
    }
  }
}
