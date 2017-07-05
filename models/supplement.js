/**
 * 补充材料
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('supplement', {
    content: {
        type: mysqlKit.string(200),
        allowNull: true
    }
})

module.exports = model