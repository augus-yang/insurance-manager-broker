/**
 * 最新信息Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const newsService = require(path.resolve(__dirname, '../../services/newsService.js'))


class Api extends ControllerBase {
    router() {
        router.post('/news', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('total').notBlank()
                ctx.checkBody('content').notBlank()
                ctx.checkBody('mobile').notBlank()
            })
            let fileName =  ctx.request.body.enclosure
            let total = ctx.request.body.total
            let content = ctx.request.body.content
            let mobile = ctx.request.body.mobile
            let name = fileName.slice(fileName.lastIndexOf('/' )+1)
            let sender = ctx.session.login.user.id

            await newsService.create(total, content, mobile, name, sender, fileName)

            ctx.api.success()
        })

        router.put('/news/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('total').notBlank()
                ctx.checkBody('content').notBlank()
                ctx.checkBody('mobile').notBlank()
            })

            let id = ctx.params.id
            let total = ctx.request.body.total
            let content = ctx.request.body.content
            let mobile = ctx.request.body.mobile

            // 根据手机号查询用户
            let user = await newsService.getAllModel().user.findOne({
                where: {
                    mobile: mobile
                }
            })

            if(!user){
                newsService.throwMessage('用户不存在')
            }

            await newsService.updateById(id, {
                total: total,
                content: content,
                receiver: user.id,
                status: status
            })

            ctx.api.success()
        })

        router.delete('/news/:newsId', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('newsId').notBlank()
            })

            let id = ctx.params.newsId

            await newsService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()