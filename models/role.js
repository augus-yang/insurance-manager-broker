/**
 * 角色
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('role', {
    name: {
        type: mysqlKit.string(50),
        unique: 'name',
        allowNull: false
    },
    describe: {
        type: mysqlKit.string(50),
        allowNull: false
    }
})

module.exports = model