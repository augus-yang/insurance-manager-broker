/**
 * 预约赴港Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const appointmentService = require(path.resolve(__dirname, '../services/appointmentService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/appointment/page', async(ctx) => {
            ctx.controller.success('appointment/page')
        })

        router.get('/appointment/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await appointmentService.findById(id)
            ctx.controller.success('appointment/detail', {
                bean: bean
            })
        })

        router.get('/appointment/update/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await appointmentService.findById(id)
            ctx.controller.success('appointment/update', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()