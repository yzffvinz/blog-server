require('module-alias/register')
const menu = require('@/service/menu')

menu.getMenu().then(data => {
  console.log(data)
})
