/**
 * 渲染Middleware
 */

const path = require('path')
const logKit = require(path.resolve(__dirname, '../kits/logKit.js'))
const LoginTimeOutError = require(path.resolve(__dirname, '../errors/loginTimeOutError.js'))

function dtb(ctx, status, data) {
    ctx.response.status = status
    ctx.response.type = 'application/json'
    ctx.response.body = data
}

class Dtb {
    constructor(ctx) {
        // 获取基本信息
        let draw = ctx.request.body.draw
        let start = ctx.request.body.start
        let length = ctx.request.body.length

        // 转换成数字
        draw = parseInt(draw)
        start = parseInt(start)
        length = parseInt(length)

        // 设置body
        this.body = {
            draw: draw,
            start: start,
            length: length,
            where: {}
        }

        // 获取时间
        let createdAtFrom = ctx.request.body.createdAtFrom
        let createdAtTo = ctx.request.body.createdAtTo
        let updatedAtFrom = ctx.request.body.updatedAtFrom
        let updatedAtTo = ctx.request.body.updatedAtTo

        // 设置创建时间查询条件
        let createdAt = {}
        if (createdAtFrom) {
            createdAt.$gte = createdAtFrom + ' 00:00:00'
        }
        if (createdAtTo) {
            createdAt.$lte = createdAtTo + ' 23:59:59'
        }

        // 设置更新时间查询条件
        let updatedAt = {}
        if (updatedAtFrom) {
            updatedAt.$gte = updatedAtFrom + ' 00:00:00'
        }
        if (updatedAtTo) {
            updatedAt.$lte = updatedAtTo + ' 23:59:59'
        }

        // 设置查询条件
        if (createdAt.$gte || createdAt.$lte) {
            this.body.where.createdAt = createdAt
        }

        if (updatedAt.$gte || updatedAt.$lte) {
            this.body.where.updatedAt = updatedAt
        }

        this.ctx = ctx
    }

    success(data) {
        dtb(this.ctx, 200, data)
    }
}

module.exports = () => {
    return async (ctx, next) => {
        let pathPrefix = ctx.request.path.substring(0, 4)
        // 如果是dtb请求，则返回datatable信息
        if (pathPrefix === '/dtb') {
            ctx.dtb = new Dtb(ctx)

            try {
                await next()
            } catch (e) {
                if (e instanceof LoginTimeOutError) {
                    logKit.error(e.message + ' ' + ctx.request.url)
                    ctx.redirect('/login')
                } else {
                    logKit.error(e)
                }
            }

            logKit.info(`render finish ${ctx.request.url} ` + JSON.stringify(ctx.response.body))
        } else {
            await next()
        }
    }
}