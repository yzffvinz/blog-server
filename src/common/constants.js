// 常量
module.exports = {
  RESPONSE_CODES: {
    SUCCESS: { status: 0, msg: '' },
    FAILED: { status: 1, msg: '糟糕，发生了一些异常' },
    LOGIN_NOT: { status: 520, msg: '用户未登录' },
    LOGIN_FAILED: { status: 521, msg: '用户名/密码错误' }
  }
}
