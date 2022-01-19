/**
 * 构建返回 bean，
 * 正常 json 结构为
 * code
 * msg
 * data
 */
const { RESPONSE_CODES } = require('@/common/constants')

class ResponseBean {
  constructor (data, err = RESPONSE_CODES.SUCCESS, msg = '') {
    const res = {
      ...err,
      data
    }
    msg && (res.msg = msg)
    this.res = res
  }

  body () {
    return JSON.stringify(this.res)
  }
}
// json 格式的返回
function jsonResponse (ctx, body) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = new ResponseBean(body).body()
}

module.exports = {
  jsonResponse
}
