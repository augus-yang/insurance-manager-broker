/**
 * 预约服务Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const bespokeService = require(path.resolve(__dirname, '../../services/bespokeService.js'))

class BespokeApi extends ControllerBase {
    router() {
        router.post('/bespoke', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('content').notBlank()
            })

            let content = ctx.request.body.content
            let userId = ctx.token.userId

            await bespokeService.create({
                content: content,
                userId: userId
            })

            ctx.api.success()
        })

        router.get('/bespoke/findAll', async(ctx) => {

            let userId = ctx.token.userId
            let bespokeList = await bespokeService.findByUserId(userId)

            ctx.api.success({
                bespokeList: bespokeList
            })
        })


        return router
    }
}

module.exports = new BespokeApi().router()