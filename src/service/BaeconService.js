const { addDocument, queryList } = require('@/dao/LowcodeDao')

const DOMAIN = 'baecon'

module.exports = {
  async logBaecon (params) {
    return await addDocument(DOMAIN, params)
  },
  async getPV (page, data) {
    const options = [{ field: 'page', val: page }]
    if (data) options.push({ field: 'data', val: data })
    const pv = await queryList(DOMAIN, options)
    return pv.length
  }
}
