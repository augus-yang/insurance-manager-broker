/**
 * 方案
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

const model = mysqlKit.define('programme',{
    insurant: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    sex: {
        type: mysqlKit.enum,
        values: constantKit.getSexType(),
        allowNull: false
    },
    birthday: {
        type: mysqlKit.date,
        allowNull: false,
        get: function()  {
            let value = this.getDataValue('birthday')
            if (value) {
                return dateTimeKit.format(value, 'YYYY-MM-DD')
            }
        }
    },
    smoke: {
        type: mysqlKit.boolean,
        allowNull: false
    },
    product: {
        type: mysqlKit.enum,
        values: constantKit.getProductType(),
        allowNull: false
    },
    budget: {
        type: mysqlKit.enum,
        values: constantKit.getBudgetType(),
        allowNull: false
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    }
})

module.exports = model