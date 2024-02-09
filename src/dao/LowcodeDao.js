const { executeQuery, __wrapObjectId } = require('./connection')

const { WHERE_OPS, MONGO_COMPARE_OPS_MAP, WHERE_TYPES } = require('./Constants')
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

      const rows = await executeQuery(domain, async collection =>
        collection.find(whereOptions)
      )

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
    }
  },
  async addDocument (domain, item) {
    const now = Date.now()
    return await executeQuery(domain, async collection =>
      collection.insertOne({ ...item, updatetime: now, createtime: now, version: 1 })
    )
  },
  async modifyDocument (domain, item) {
    const _id = __wrapObjectId(item._id)
    __transformTime(item)
    // const now = Date.now()
    // const copy = { ...item, updatetime: now }
    const copy = { ...item }
    delete copy._id

    return await executeQuery(domain, async collection =>
      collection.updateOne({ _id }, { $set: copy })
    )
  },
  async delDocument (domain, id) {
    const _id = __wrapObjectId(id)
    return await executeQuery(domain, async collection =>
      collection.deleteOne({ _id })
    )
  }
}
