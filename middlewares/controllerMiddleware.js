/**
 * 渲染Middleware
 */

const nunjucks = require('nunjucks')
const path = require('path')
const views = path.resolve(__dirname, '../views')
const logKit = require(path.resolve(__dirname, '../kits/logKit.js'))
const CustomError = require(path.resolve(__dirname, '../errors/customError.js'))
const LoginTimeOutError = require(path.resolve(__dirname, '../errors/loginTimeOutError.js'))

const nunjucksSuffix = ".njk"

/**
 * 创建nunjucks环境实例
 */
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(views))

function controller(ctx, status, view, data) {
    ctx.response.status = status
    ctx.response.type = 'text/html'

    data = data || {}
    if (status === 200 && !ctx.session.isNew) {
        data.login = ctx.session.login
    }
    ctx.response.body = env.render(view + nunjucksSuffix, data || {})
}

class Controller {
    constructor(ctx) {
        this.ctx = ctx
    }

    success(view, data) {
        controller(this.ctx, 200, view, data)
    }

    customError(message) {
        controller(this.ctx, 400, 'error', {
            message: message
        })
    }
}

module.exports = () => {
    return async (ctx, next) => {
        let pathPrefix = ctx.request.path.substring(0, 4)
        // 如果是controller请求，则返回view视图
        if (pathPrefix !== '/api' && pathPrefix !== '/dtb') {
            ctx.controller = new Controller(ctx)

            try {
                await next()
            } catch (e) {
                if (e instanceof LoginTimeOutError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.redirect('/login')
                } else if (e instanceof CustomError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.controller.customError(e.message)
                } else {
                    logKit.error(e)
                    ctx.redirect('/error')
                }
            }

            logKit.info(`render finish ${ctx.request.url} `)
        } else {
            await next()
        }
    }
}