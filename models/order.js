/**
 * 订单
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('order', {
    status: {
        type: mysqlKit.enum,
        values: constantKit.getOrderStatusType(),
        allowNull: false
    },
    supplementStatus: {
        type: mysqlKit.boolean,
        allowNull: false
    }
})

module.exports = model