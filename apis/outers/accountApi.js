/**
 * 奖励Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const accountService = require(path.resolve(__dirname, '../../services/accountService.js'))

class accountApi extends ControllerBase {
    router() {
        router.get('/account/findAllMoney', async(ctx) => {

            let userId = ctx.token.userId
            let account= await accountService.findByUserId(userId)

            ctx.api.success({
                account: account
            })
        })

        return router
    }
}

module.exports = new accountApi().router()