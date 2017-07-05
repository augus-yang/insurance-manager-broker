/**
 * 保险下单Controller
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const insuranceOrderService = require(path.resolve(__dirname, '../services/insuranceOrderService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/insuranceOrder/update/:id', async(ctx) => {
            let id = ctx.params.id
            let constant = constantKit.getAll()
            let bean = await insuranceOrderService.findById(id)

            ctx.controller.success('insuranceOrder/update', {
                bean: bean,
                constant: constant
            })
        })

        return router
    }
}

module.exports = new Controller().router()