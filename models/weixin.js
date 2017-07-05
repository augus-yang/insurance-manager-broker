/**
 * 微信
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('weixin',{
    openId: {
        type: mysqlKit.string(50),
        unique: 'openId',
        allowNull: false
    }
})

module.exports = model
