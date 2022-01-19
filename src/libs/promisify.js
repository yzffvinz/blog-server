function promisify (fn) {
  return function () {
    const args = arguments
    return new Promise(function (resolve, reject) {
      [].push.call(args, function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
      fn.apply(null, args)
    })
  }
}

module.exports = promisify
