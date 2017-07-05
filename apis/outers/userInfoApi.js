/**
 * 个人信息Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const bankService = require(path.resolve(__dirname, '../../services/bankService.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))

class userInfoApi extends ControllerBase {
    router() {
        router.get('/userInfo', async(ctx) => {

            let userId = ctx.token.userId

            let user = await userService.findById(userId)
            let broker = await brokerService.findByUserId(userId)
            let bank = await bankService.findByUserId(userId)

            ctx.api.success({
                user: user,
                broker: broker,
                bank: bank
            })
        })

        return router
    }
}

module.exports = new userInfoApi().router()