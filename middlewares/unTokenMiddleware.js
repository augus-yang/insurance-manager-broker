/**
 * 不用tokenMiddleware
 */

const path = require('path')
const unToken = require(path.resolve(__dirname, '../configs/unToken.json'))
const TokenError = require(path.resolve(__dirname, '../errors/tokenError.js'))
const tokenKit = require(path.resolve(__dirname, '../kits/tokenKit.js'))

module.exports = () => {
    return async (ctx, next) => {
        let pathPrefix = ctx.request.path.substring(0, 10)
        // 如果是api外部请求，则验证token值
        if (pathPrefix === '/api/outer') {
            let accessPath = ctx.request.path

            let needToken = true

            for (let i in unToken) {
                if (accessPath.match('/api/outer' + unToken[i])) {
                    needToken = false
                    break
                }
            }

            if (needToken) {
                let token = ctx.request.header.token
                let tokenValue = await tokenKit.get(token)

                if (!token || !tokenValue) {
                    throw new TokenError()
                }

                ctx.token = tokenValue
            }
        }

        await next()
    }
}