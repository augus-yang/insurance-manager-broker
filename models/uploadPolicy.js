/**
 * 上传保单
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('upload_policy',{
    policyNumber: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    img: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    }
})

module.exports = model