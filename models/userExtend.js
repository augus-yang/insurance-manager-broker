/**
 * 推广绑定用户
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('user_extend', {
    invitation: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    userId: {
        type: mysqlKit.string(50),
        allowNull: false
    }
})

module.exports = model