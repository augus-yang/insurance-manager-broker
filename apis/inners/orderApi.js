/**
 * 订单Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))

class Api extends ControllerBase {
    router() {
        router.put('/order/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('status').notBlank()
            })

            let id = ctx.params.id
            let status = ctx.request.body.status
            let policyMoney = ctx.request.body.policyMoney
            let extendMoney = ctx.request.body.extendMoney
            let order = await orderService.findById(id)

            if(policyMoney){
                await orderService.updateByOrderStatusAndAccount(id, status, policyMoney, extendMoney, order.userId)
            } else {
                await orderService.updateById(id, {
                    status: status
                })
            }

            ctx.api.success()
        })

        router.put('/order/update/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('supplementStatus').notBlank()
            })

            let id = ctx.params.id
            let supplementStatus = ctx.request.body.supplementStatus

                await orderService.updateById(id, {
                    supplementStatus: supplementStatus
                })

            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()