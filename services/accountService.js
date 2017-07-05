/**
 * 奖励账户Service
 */

const path = require('path')
const account = require(path.resolve(__dirname, '../models/account.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {

    async findByUserId(userId) {
        return await account.findOne({
            where: {
                userId: userId
            }
        })
    }

}

module.exports = new Service(account)