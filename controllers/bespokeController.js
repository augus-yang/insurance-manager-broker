/**
 * 预约服务Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const bespokeService = require(path.resolve(__dirname, '../services/bespokeService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/bespoke/page', async(ctx) => {
            ctx.controller.success('bespoke/page')
        })

        router.get('/bespoke/create', async (ctx) => {
            ctx.controller.success('bespoke/create')
        })

        router.get('/bespoke/update/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await bespokeService.findById(id)
            ctx.controller.success('bespoke/update', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()