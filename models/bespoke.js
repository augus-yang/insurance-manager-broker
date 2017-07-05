/**
 * 预约服务
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('bespoke',{
    content: {
        type: mysqlKit.string(500),
        allowNull: false
    }
})

module.exports = model
