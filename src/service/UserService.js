/**
 * @file tag 集合相关 Service 层方法
 * @author Wenzhe
 */
const { queryUser } = require('@/dao/UserDao')

/**
  * 查询菜单信息
  * @returns menus
  */
async function verifyUser ({ username, password }) {
  const user = await queryUser(username, password)
  return user && user.length
}

module.exports = {
  verifyUser
}
