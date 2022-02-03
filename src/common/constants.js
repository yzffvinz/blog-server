// 常量
module.exports = {
  RESPONSE_CODES: {
    SUCCESS: { code: 0, msg: '' },
    FAILED: { code: 1, msg: '糟糕，发生了一些异常' },
    LOGIN_NOT: { code: 520, msg: '用户未登录' },
    LOGIN_FAILED: { code: 521, msg: '用户名/密码错误' }
  }
}
