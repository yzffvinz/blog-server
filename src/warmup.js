// 数据预热
const { queryArticleList } = require('@/service/article')

function warmup () {
  queryArticleList()
}

warmup()

// polyfill
function polyfill () {
  Array.prototype.at = function (index) {
    if (index < 0) {
      index += this.length
    }
    return this[index]
  }
}

polyfill()
