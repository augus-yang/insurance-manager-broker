/**
 * 奖励Service
 */

const path = require('path')
const reward = require(path.resolve(__dirname, '../models/reward.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const accountService = require((__dirname + '/accountService.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {
    async createReward(orderId, money, rewardType, userId, t) {
        await reward.create({
            money: money,
            rewardType: rewardType,
            orderId: orderId,
            userId: userId
        }, {
            transaction: t
        })
    }


    // async create(orderId, money, userId) {
    //
    //     await super.transaction(async(t) => {
    //         await reward.create({
    //         money: money,
    //         rewardType: constantKit.getRewardType()[0],
    //         orderId: orderId
    //     }, {
    //          transaction: t
    //         })
    //         let account = await accountService.findByUserId(userId)
    //         let sum = account.policyReward + money
    //         await super.getAllModel().account.update({
    //             policyReward: sum
    //         }, {
    //             where: {
    //                 userId: userId
    //             },
    //             transaction: t
    //         })
    //     })
    // }


}

module.exports = new Service(reward)