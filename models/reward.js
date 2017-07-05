/**
 * 奖励
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('reward', {
    money: {
        type: mysqlKit.double,
        allowNull: false
    },
    rewardType: {
        type: mysqlKit.enum,
        values: constantKit.getRewardType(),
        allowNull: false
    }
})

module.exports = model