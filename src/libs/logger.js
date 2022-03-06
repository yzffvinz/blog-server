
const log4js = require('log4js')

log4js.configure({
  replaceConsole: true,
  pm2: true,
  appenders: {
    stdout: { // 控制台输出
      type: 'console'
    },
    all: { // 请求转发日志
      type: 'dateFile', // 指定日志文件按时间打印
      filename: 'logs/all/all', // 指定输出文件路径
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    err: { // 错误日志
      type: 'dateFile',
      filename: 'logs/err/err',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    // appenders:采用的appender,取appenders项,level:设置级别
    default: { appenders: ['stdout', 'all'], level: 'debug' },
    err: { appenders: ['stdout', 'err'], level: 'warn' }
  }
})

const ALL_LOG = log4js.getLogger('all')
const ERR_LOG = log4js.getLogger('err')

class Logger {
  constructor (name = '') {
    this.name = name
  }

  info (...args) {
    ALL_LOG.info(this.name, ...args)
  }

  warn (...args) {
    ALL_LOG.warn(this.name, ...args)
    ERR_LOG.warn(this.name, ...args)
  }

  error (...args) {
    ALL_LOG.error(this.name, ...args)
    ERR_LOG.error(this.name, ...args)
  }
}

module.exports = exports = new Logger()
