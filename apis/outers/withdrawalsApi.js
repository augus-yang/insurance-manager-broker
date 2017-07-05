/**
 * 提现Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const withdrawalsService = require(path.resolve(__dirname, '../../services/withdrawalsService.js'))
const accountService = require(path.resolve(__dirname, '../../services/accountService.js'))

class withdrawalsApi extends ControllerBase {
    router() {
        router.post('/withdrawals/find', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('money').notBlank()
                ctx.checkBody('money').gt(0)
            })

            let money = ctx.request.body.money
            let userId = ctx.token.userId

            await withdrawalsService.create(money, userId)

            ctx.api.success()
        })
        router.get('/withdrawals/findMoney', async(ctx) => {

            let userId = ctx.token.userId
            let account = await accountService.findByUserId(userId)

            let withdrawals = await withdrawalsService.findByAccountId(account.id)

            ctx.api.success({
                withdrawals: withdrawals
            })
        })

        return router
    }
}

module.exports = new withdrawalsApi().router()