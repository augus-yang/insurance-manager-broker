/**
 * 用户
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('user', {
    name: {
        type: mysqlKit.string(50),
        unique: 'name',
        allowNull: false
    },
    pwd: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    mobile: {
        type: mysqlKit.char(11),
        unique: 'mobile',
        allowNull: false
    },
})

module.exports = model