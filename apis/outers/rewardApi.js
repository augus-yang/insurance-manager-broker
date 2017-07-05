/**
 * 奖励Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))
const weixinExtendService = require(path.resolve(__dirname, '../../services/weixinExtendService.js'))
const weixinService = require(path.resolve(__dirname, '../../services/weixinService.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))

class rewardApi extends ControllerBase {
    router() {
        router.get('/reward/findPolicy', async(ctx) => {

            let id = ctx.token.userId
            let status = constantKit.getOrderStatusType()[13]

            let user = await userService.findById(id)

            let order = await orderService.findByUserIdOrder(id, status)


            ctx.api.success({
                order: order,
                user: user
            })
        })

        router.get('/reward/findExtend', async(ctx) => {

            let userId = ctx.token.userId
            let status = constantKit.getOrderStatusType()[13]

            let broker = await brokerService.findByUserId(userId)
            let weixinExtend = await weixinExtendService.findByInvitation(broker.invitation)
            let orderList = []
            if(weixinExtend.length > 0){
                for(let i in weixinExtend){

                    let order = await orderService.findByUserIdOrder(userExtend[i].userId, status)

                    if(order){
                        orderList.push(order)
                    }else {
                        weixinService.throwMessage('您还没有推广奖励')
                    }
                //     let weixin = await weixinService.findByOpenId(weixinExtend[i].openId)
                //     if(weixin){
                //        let user = await userService.findById(weixin.userId)
                //        let order = await orderService.findByUserIdOrder(user.id, status)
                //
                //         orderList.push(order)
                //
                //     }else {
                //         weixinService.throwMessage('您还没有推广奖励')
                //     }
                 }

            }else {
                weixinService.throwMessage('您还没有推广奖励')
            }
            ctx.api.success({
                order: orderList
            })

        })

        return router
    }
}

module.exports = new rewardApi().router()