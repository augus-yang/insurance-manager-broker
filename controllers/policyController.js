/**
 * 保单托管Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const policyService = require(path.resolve(__dirname, '../services/policyService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/policy/page', async(ctx) => {
            ctx.controller.success('policy/page')
        })

        router.get('/policy/create', async (ctx) => {
            ctx.controller.success('policy/create')
        })

        router.get('/policy/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await policyService.findById(id)
            ctx.controller.success('policy/detail', {
                bean: bean
            })
        })

        router.get('/policy/update/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await policyService.findById(id)
            ctx.controller.success('policy/update', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()