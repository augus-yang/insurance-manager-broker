/**
 * 附件
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('enclosure', {
    name: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    downLoadAddress: {
        type: mysqlKit.string(200),
        allowNull: false
    }
})

module.exports = model