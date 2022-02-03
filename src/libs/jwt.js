const jwt = require('jsonwebtoken')

const COOKIE_KEY = 'token'

function encrypt (data, time = '15d') {
  return jwt.sign(data, 'token', { expiresIn: time })
}

function decrypt (token) {
  try {
    const data = jwt.verify(token, 'token')
    return {
      token: true,
      data
    }
  } catch (e) {
    return {
      token: false,
      data: e
    }
  }
}

function verifyToken (ctx) {
  const token = ctx.cookies.get(COOKIE_KEY)
  return decrypt(token)
}

module.exports = exports = {
  verifyToken,
  encrypt,
  decrypt
}
