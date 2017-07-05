/**
 * 最新信息
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('news', {
    total: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    content: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    status: {
        type: mysqlKit.boolean,
        allowNull: false
    }
})

module.exports = model