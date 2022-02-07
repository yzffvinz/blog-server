/**
 * @file user 集合相关 Dao 层方法
 * @author Wenzhe
 */
const quick = require('./quick')
const COLLECION_NAME = 'user' // 涉及的集合名称 user

// 方法绑定集合名称
const localFind = quick.find.bind(null, COLLECION_NAME)

/**
  * 查询用户
  * @returns 博客分类（一级标签）
  */
async function queryUser (username, password) {
  const user = await localFind({ username, password })
  return user
}

module.exports = {
  queryUser
}
