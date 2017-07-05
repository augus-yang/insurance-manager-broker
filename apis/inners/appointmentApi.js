/**
 * 预约赴港Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const appointmentService = require(path.resolve(__dirname, '../../services/appointmentService.js'))

class Api extends ControllerBase {
    router() {
        router.put('/appointment/:id/audit', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('audit').isIn(constantKit.getStatusType())
            })

            let id = ctx.params.id
            let audit = ctx.request.body.audit

            await appointmentService.updateById(id, {
                status: audit
            })

            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()