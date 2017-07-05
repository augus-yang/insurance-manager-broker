/**
 * 提现Service
 */

const path = require('path')
const withdrawals = require(path.resolve(__dirname, '../models/withdrawals.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const accountService = require((__dirname + '/accountService.js'))
const bankService = require((__dirname + '/bankService.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {


    async updateNo(id, audit, userId) {

        let account = await accountService.findByUserId(userId)
        let sss = await withdrawals.findById(id)
        let policyMoney = sss.policyMoney
        let extendMoney = sss.extendMoney

        let sum = account.policyReward + policyMoney
        let num = account.extendReward + extendMoney

        let bean = await withdrawals.findById(id)

        if(bean.refundStatus){
            super.throwMessage('已退款无法重复操作')
        }

        await super.transaction(async(t) => {

            let update = await withdrawals.update({
                status: audit,
                refundStatus: true
            }, {
                where: {
                    id: id
                },
                transaction: t
            })

            if (update[0] === 0) {
                t.rollback()
            }

            let updates = await super.getAllModel().account.update({
                policyReward: sum,
                extendReward: num
            }, {
                where: {
                    userId: userId
                },
                transaction: t
            })

            if (updates[0] === 0) {
                t.rollback()
            }

        })
    }


    /**
     *
     * @param money
     * @param userId
     * @returns {Promise.<void>}
     */
    async create(money, userId) {

        let policyMoney = 0
        let extendMoney = 0
        let account = await accountService.findByUserId(userId)

        // 余额不足
        if(money > (account.extendReward + account.policyReward)){
            accountService.throwMessage('余额不足')
        }

        // 保单金额足够
        if(money <= account.policyReward){
            policyMoney = money
        } else {
            policyMoney = account.policyReward
            extendMoney = money - policyMoney
        }

        let bank = await bankService.findByUserId(userId)

        await super.transaction(async(t) => {
            await withdrawals.create({
                policyMoney: policyMoney,
                extendMoney: extendMoney,
                status: constantKit.getStatusType()[0],
                refundStatus: false,
                accountId: account.id,
                bankId: bank.id
            }, {
                transaction: t
            })

            let updates = await super.getAllModel().account.update({
                policyReward: account.policyReward - policyMoney,
                extendReward: account.extendReward - extendMoney
            }, {
                where: {
                    userId: userId
                },
                transaction: t
            })

            if (updates[0] === 0) {
                t.rollback()
            }
        })
    }

    async findByAccountId(accountId) {
        return await withdrawals.findAll({
            where: {
                accountId: accountId
            }
        })
    }

}

module.exports = new Service(withdrawals)