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
  let userInfo
  if (user && user.length) {
    const keys = ['Bucket', 'Region', 'SecretId', 'SecretKey', 'username']
    userInfo = keys.reduce((sum, curKey) => {
      sum[curKey] = user[0][curKey]
      return sum
    }, {})
  }
  return userInfo
}

module.exports = {
  verifyUser
}
