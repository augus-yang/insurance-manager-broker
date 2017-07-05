/**
 * 不用登录Middleware
 */

const path = require('path')
const unLogin = require(path.resolve(__dirname, '../configs/unLogin.json'))
const LoginTimeOutError = require(path.resolve(__dirname, '../errors/loginTimeOutError.js'))

module.exports = () => {
    return async (ctx, next) => {
        let accessPath = ctx.request.path

        let needLogin = true

        for (let i in unLogin) {
            if (accessPath.match(unLogin[i])) {
                needLogin = false
                break
            }
        }

        if (needLogin) {
            if (ctx.session.isNew) {
                throw new LoginTimeOutError()
            }
        }

        await next()
    }
}