/**
 * 微信绑定推广用户
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('weixin_extend', {
    openId: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    invitation: {
        type: mysqlKit.string(50),
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['openId', 'invitation']
        }
    ]
})

module.exports = model
