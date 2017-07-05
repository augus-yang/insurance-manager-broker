/**
 * 账户
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('account', {
    policyReward: {
        type: mysqlKit.double,
        allowNull: false
    },
    extendReward: {
        type: mysqlKit.double,
        allowNull: false
    }
})

module.exports = model