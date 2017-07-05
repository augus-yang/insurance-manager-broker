/**
 * 预约服务Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const bespokeService = require(path.resolve(__dirname, '../../services/bespokeService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/bespoke', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('content').notBlank()
                ctx.checkBody('mobile').notBlank()
            })

            let content = ctx.request.body.content
            let mobile = ctx.request.body.mobile

            // 根据手机号查询用户
            let user = await bespokeService.getAllModel().user.findOne({
                where: {
                    mobile: mobile
                }
            })

            if(!user){
                bespokeService.throwMessage('用户不存在')
            }

            await bespokeService.create({
                content: content,
                userId: user.id
            })

            ctx.api.success()
        })

        router.put('/bespoke/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('content').notBlank()
            })

            let id = ctx.params.id
            let content = ctx.request.body.content

            await bespokeService.updateById(id, {
                content: content
            })

            ctx.api.success()
        })

        router.delete('/bespoke/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await bespokeService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()