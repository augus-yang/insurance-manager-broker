/**
 * 提现Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const withdrawalsService = require(path.resolve(__dirname, '../../services/withdrawalsService.js'))

class Api extends ControllerBase {
    router() {
        router.put('/withdrawals/:id/:userId/audit', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkParams('userId').notBlank()
                ctx.checkBody('audit').isIn(constantKit.getStatusType())
            })

            let id = ctx.params.id
            let audit = ctx.request.body.audit
            let userId = ctx.params.userId

            if(audit === constantKit.getStatusType()[1]){
                await withdrawalsService.updateById(id, {
                    status: audit
                })
            } else {

                await withdrawalsService.updateNo(id, audit, userId)
            }



            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()