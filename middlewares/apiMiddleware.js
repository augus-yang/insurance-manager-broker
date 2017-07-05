/**
 * api渲染Middleware
 */

const path = require('path')
const logKit = require(path.resolve(__dirname, '../kits/logKit.js'))
const CustomError = require(path.resolve(__dirname, '../errors/customError.js'))
const LoginTimeOutError = require(path.resolve(__dirname, '../errors/loginTimeOutError.js'))
const TokenError = require(path.resolve(__dirname, '../errors/tokenError.js'))

function api(ctx, status, code, message, data) {
    ctx.response.status = status
    ctx.response.type = 'application/json'
    ctx.response.body = {
        'code': code,
        'message': message,
        'data': data
    }
}

class Api {
    constructor(ctx) {
        this.ctx = ctx
    }

    success(data) {
        api(this.ctx, 200, 'success', '请求成功', data || '')
    }

    customError(message) {
        api(this.ctx, 400, 'custom_error', message || '请求失败', '')
    }

    systemError() {
        api(this.ctx, 500, 'system_error', '系统异常', '')
    }

    loginTimeOutError() {
        api(this.ctx, 401, 'login_timeout_error', '登录超时', '')
    }

    tokenError() {
        api(this.ctx, 405, 'token_error', 'token错误', '')
    }
}

module.exports = () => {
    return async (ctx, next) => {
        let pathPrefix = ctx.request.path.substring(0, 4)
        // 如果是api请求，则返回json信息
        if (pathPrefix === '/api') {
            ctx.api = new Api(ctx)

            try {
                await next()
            } catch (e) {
                if (e instanceof TokenError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.api.tokenError()
                } else if (e instanceof CustomError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.api.customError(e.message)
                } else if (e instanceof LoginTimeOutError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.api.loginTimeOutError()
                } else {
                    logKit.error(e)
                    ctx.api.systemError()
                }
            }

            logKit.info(`render finish ${ctx.request.url} ` + JSON.stringify(ctx.response.body))
        } else {
            await next()
        }
    }
}