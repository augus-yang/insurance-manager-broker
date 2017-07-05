/**
 * 全民经纪Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))

class Api extends ControllerBase {
    router() {
        router.put('/broker/:id/audit', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('audit').isIn(constantKit.getStatusType())
            })

            let id = ctx.params.id
            let status = ctx.request.body.audit

            let broker = await brokerService.findById(id)
            let userId = broker.userId
            let sender =  ctx.session.login.user.id
            await brokerService.updateStatus(id, status, sender, userId)

            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()