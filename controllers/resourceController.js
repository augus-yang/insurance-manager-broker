/**
 * 资源Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const resourceService = require(path.resolve(__dirname, '../services/resourceService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/resource/page', async (ctx) => {
            ctx.controller.success('resource/page')
        })

        router.get('/resource/create', async (ctx) => {
            ctx.controller.success('resource/create')
        })

        router.get('/resource/update/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await resourceService.findById(id)
            ctx.controller.success('resource/update', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()