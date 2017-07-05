/**
 * 获取方案Controller
 */

const router = require('koa-router')()
const path = require('path')
const programmeService = require(path.resolve(__dirname, '../services/programmeService.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/programme/create/:orderId', async (ctx) => {
            let orderId = ctx.params.orderId

            let list = constantKit.getAll()
            ctx.controller.success('programme/create', {
                list: list,
                orderId: orderId
            })
        })

        router.get('/programme/update/:id', async(ctx) => {
            let id = ctx.params.id

            let list = constantKit.getAll()
            let bean = await programmeService.findById(id)

            ctx.controller.success('programme/update', {
                bean: bean,
                list: list
            })
        })

        return router
    }
}

module.exports = new Controller().router()