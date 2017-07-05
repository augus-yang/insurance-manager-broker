/**
 * 受益人
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('beneficiary',{
    name: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    scale: {
        type: mysqlKit.double,
        allowNull: false
    }
})

module.exports = model