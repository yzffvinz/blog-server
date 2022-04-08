// what i want
// { [field]: {value: '', op: ''} }
const { queryList, addDocument, modifyDocument, delDocument } = require('@/dao/LowcodeDao')
const WHERE_FIELD_PREFIX = 'where_field_'
const WHERE_OP_PREFIX = 'where_op_'
const WHERE_OP_TYPE = 'where_type_'

const isDef = (val) => {
  return val !== null && val !== undefined && val !== ''
}

module.exports = {
  async list (domain, query) {
    const { page = 1, perPage = 10, allPage, orderBy, orderDir } = query
    const keys = Object.keys(query)
    const options = { page: allPage ? null : { page, perPage }, sort: [{ orderBy, orderDir }] }

    const where = []
    keys.forEach(key => {
      if (key.startsWith(WHERE_FIELD_PREFIX)) {
        const field = key.substring(WHERE_FIELD_PREFIX.length)
        const val = query[key].trim()
        const type = query[`${WHERE_OP_TYPE}${field}`]

        isDef(val) && where.push({
          field,
          val,
          type,
          op: query[`${WHERE_OP_PREFIX}${field}`]
        })
      }
    })

    const rows = await queryList(domain, where, options)
    const allRows = await queryList(domain, where)

    return {
      rows,
      count: allRows.length
    }
  },
  async options (domain, query) {
    const rows = await queryList(domain)
    const { labelField, valueField } = query
    return {
      options: rows.map(row => ({
        ...row,
        label: row[labelField],
        value: row[valueField]
      }))
    }
  },
  async add (domain, formdata) {
    return await addDocument(domain, formdata)
  },
  async modify (domain, formdata) {
    return await modifyDocument(domain, formdata)
  },
  async del (domain, id) {
    return await delDocument(domain, id)
  }
}
