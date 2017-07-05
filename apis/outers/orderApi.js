/**
 * 订单Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))
const weixinService = require(path.resolve(__dirname, '../../services/weixinService.js'))
const weixinExtendService = require(path.resolve(__dirname, '../../services/weixinExtendService.js'))
const userExtendService = require(path.resolve(__dirname, '../../services/userExtendService.js'))

class orderApi extends ControllerBase {
    router() {
        router.get('/order', async(ctx) => {
            let userId = ctx.token.userId

            // 自身订单
            let orderList = await orderService.findByUserId(userId)

            // 全民经纪
            let broker = await brokerService.findByUserId(userId)

            // 微信绑定推广用户
            let weixinExtend = await weixinExtendService.findByInvitation(broker.invitation)
            let openIds = []
            for(let i in weixinExtend){
                openIds.push(weixinExtend[i].openId)
            }

            // 微信
            let weixin = await weixinService.findByOpenIds(openIds)
            let userIds = []
            for(let i in weixin){
                userIds.push(weixin[i].userId)
            }

            // 推广订单
            let extendOrderList = await orderService.findByUserIds(userIds)

            ctx.api.success({
                orderList: orderList,
                extendOrderList: extendOrderList
            })
        })

        router.get('/order/extend', async(ctx) => {
            let userId = ctx.token.userId

            // 全民经纪
            let broker = await brokerService.findByUserId(userId)

            // 微信绑定推广用户
            // let weixinExtend = await weixinExtendService.findByInvitation(broker.invitation)
            // let openIds = []
            // for(let i in weixinExtend){
            //     openIds.push(weixinExtend[i].openId)
            // }

            // // 微信
            // let weixin = await weixinService.findByOpenIds(openIds)
            // let userIds = []
            // for(let i in weixin){
            //     userIds.push(weixin[i].userId)
            // }

            let userExtend = await userExtendService.findByInvitation(broker.invitation)

            let userIds = []
            for(let i in userExtend){
                userIds.push(userExtend[i].userId)
            }

            let extendList = await orderService.getAllModel().user.findAll({
                group: 'id',
                order: 'createdAt desc',
                where: {
                    id: {
                        $in: userIds
                    }
                },
                include: {
                    model: orderService.getAllModel().order
                }
            })

            ctx.api.success({
                extendList: extendList
            })
        })

        return router
    }
}

module.exports = new orderApi().router()