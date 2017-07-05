/**
 * 受益人Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const beneficiaryService = require(path.resolve(__dirname, '../services/beneficiaryService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/beneficiary/update/:id', async(ctx) => {
            let id = ctx.params.id
            let bean = await beneficiaryService.findById(id)

            ctx.controller.success('beneficiary/update', {
                bean: bean
            })
        })

        router.get('/beneficiary/create/:insuranceOrderId', async (ctx) => {
            ctx.controller.success('beneficiary/create',{
                insuranceOrderId: ctx.params.insuranceOrderId
            })
        })

        return router
    }
}

module.exports = new Controller().router()