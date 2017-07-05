/**
 * 奖励Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const rewardService = require(path.resolve(__dirname, '../services/rewardService.js'))
const insuranceOrderService = require(path.resolve(__dirname, '../services/insuranceOrderService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/reward/page', async(ctx) => {
            ctx.controller.success('reward/page')
        })

        router.get('/reward/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await rewardService.findById(id)
            let list = await insuranceOrderService.findByOrderId(bean.id)
            ctx.controller.success('reward/detail', {
                bean: bean,
                list: list
            })
        })

        return router
    }
}

module.exports = new Controller().router()