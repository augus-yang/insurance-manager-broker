/**
 * 获取方案Api
 *
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const programmeService = require(path.resolve(__dirname, '../../services/programmeService.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/programme', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('sex').notBlank()
                ctx.checkBody('birthday').notBlank()
                ctx.checkBody('smoke').notBlank()
                ctx.checkBody('product').notBlank()
                ctx.checkBody('budget').notBlank()
            })
            let insurant = ctx.request.body.insurant
            let sex = ctx.request.body.sex
            let birthday = ctx.request.body.birthday
            let smoke = ctx.request.body.smoke
            let product = ctx.request.body.product
            let budget = ctx.request.body.budget
            let userId = ctx.token.userId
            let orderId = ctx.request.body.orderId

            await programmeService.create(insurant, sex, birthday, smoke, product, budget, userId, orderId)
            ctx.api.success()
        })

        router.get('/programme/find', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('orderId').notBlank()
            })

            let orderId = ctx.request.query.orderId
            let programme = await programmeService.findByOrderId(orderId)

            ctx.api.success({
                programme: programme
            })
        })

        router.get('/programme/findAll', async(ctx) => {

            let userId = ctx.token.userId

            let programmeList = await programmeService.findByUserIdOrder(userId)

            ctx.api.success({
                programmeList: programmeList
            })
        })

        return router
    }

}

module.exports = new Api().router()