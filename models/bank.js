/**
 * 银行
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('bank', {
    name: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    bankCard: {
        type:mysqlKit.string(50),
        unique: 'flightNumber',
        allowNull: false
    },
    openAccountBank: {
        type:mysqlKit.string(50),
        allowNull: false
    }
})

module.exports = model