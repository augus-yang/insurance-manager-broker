/**
 * 预约提现
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('withdrawals', {
    policyMoney: {
        type: mysqlKit.double,
        allowNull: false
    },
    extendMoney: {
        type: mysqlKit.double,
        allowNull: false
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    },
    refundStatus: {
        type: mysqlKit.boolean,
        allowNull: false
    }
})

module.exports = model