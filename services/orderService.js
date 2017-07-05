/**
 * 订单Service
 */

const path = require('path')
const order = require(path.resolve(__dirname, '../models/order.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const accountService = require(path.resolve(__dirname + '/accountService.js'))
const rewardService = require(path.resolve(__dirname + '/rewardService.js'))
const weixinService = require(path.resolve(__dirname + '/weixinService.js'))
const userExtendService = require(path.resolve(__dirname + '/userExtendService.js'))
const brokerService = require(path.resolve(__dirname + '/brokerService.js'))

class Service extends ServiceBase {
    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await order.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            },
            include: {
                model: super.getAllModel().insuranceOrder
            }
        })
    }

    /**
     * 根据userIds查询
     * @param userIds
     * @returns {Promise.<*>}
     */
    async findByUserIds(userIds) {
        return await order.findAll({
            order: 'createdAt desc',
            where: {
                userId: {
                    $in: userIds
                }
            }
        })
    }

    /**
     * 根据用户id和状态查询
     * @param userId, status
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserIdStatus(userId, status) {
        return await order.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId,
                status: status
            }
        })
    }

    /**
     * 根据用户id和状态查询订单和保险下单
     * @param userId, status
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserIdOrder(userId, status) {
        return await order.findAll({
            where: {
                userId: userId,
                status: status
            },
            include: [
                {model: super.getAllModel().insuranceOrder},
                {model: super.getAllModel().appointment},
                {model: super.getAllModel().user}
            ]
        })
    }

    async updateByOrderStatusAndAccount(id, status, policyMoney, extendMoney, userId) {
        await super.transaction(async(t) => {

           let update = await order.update({
                status: status
            }, {
                where: {
                    id: id
                },
                transaction: t
            })

            if (update[0] === 0) {
                t.rollback()
            }

            let money = 0
            let rewardType = ''
            let orderId = ''
            let userExtend = await userExtendService.findByUserId(userId)

            if(policyMoney > 0) {
                money = policyMoney
                rewardType = constantKit.getRewardType()[0]
                orderId = id
                await rewardService.createReward(orderId, money, rewardType, userId, t)
            }

            if(extendMoney > 0){
                let brokers = await brokerService.findByInvitation(userExtend.invitation)
                money = extendMoney
                rewardType = constantKit.getRewardType()[1]
                orderId = id
                await rewardService.createReward(orderId, money, rewardType, brokers.userId, t)
            }

            //推广奖励
            if(userExtend){
                let broker = await brokerService.findByInvitation(userExtend.invitation)
                let accountExtend = await accountService.findByUserId(broker.userId)
                let num = accountExtend.extendReward + (extendMoney*100)/100
                let updatea = await super.getAllModel().account.update({
                    extendReward: num
                }, {
                    where: {
                        userId: broker.userId
                    },
                    transaction: t
                })
                if (updatea[0] === 0) {
                    t.rollback()
                }
            }

            //保单奖励
            let accountpPolicy = await accountService.findByUserId(userId)
            let sum = accountpPolicy.policyReward + (policyMoney*100)/100
            let updateq = await super.getAllModel().account.update({
                policyReward: sum
            }, {
                where: {
                    userId: userId
                },
                transaction: t
            })
            if (updateq[0] === 0) {
                t.rollback()
            }
        })
    }

}

module.exports = new Service(order)