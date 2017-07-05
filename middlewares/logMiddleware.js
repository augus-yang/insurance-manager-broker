/**
 * 日志Middleware
 */

const path = require('path')
const logKit = require(path.resolve(__dirname, '../kits/logKit.js'))

const mid = {}

/**
 * 开始
 * @returns {function(*, *)}
 */
mid.start = () => {
    return async(ctx, next) => {
        logKit.info(`render start ${ctx.request.method} ${ctx.request.url}`)
        await next()
    }
}

/**
 * 结束
 */
mid.end = () => {
    logKit.info('app started at port 3000...')
}

module.exports = mid