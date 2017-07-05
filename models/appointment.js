/**
 * 预约赴港
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

const model = mysqlKit.define('appointment',{
    flightNumber: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    peoples: {
        type: mysqlKit.integer,
        allowNull: false
    },
    flightDate: {
        type: mysqlKit.date,
        allowNull: false,
        get: function()  {
            let value = this.getDataValue('flightDate')
            if (value) {
                return dateTimeKit.format(value)
            }
        }
    },
    whetherOpenAccount: {
        type: mysqlKit.boolean,
        allowNull: false
    },
    openAccountType: {
        type: mysqlKit.enum,
        values: constantKit.getOpenAccountType(),
        allowNull: true
    },
    openAccountBank: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    flightImg: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    flightImgTwo: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    }
})

module.exports = model