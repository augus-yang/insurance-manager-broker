/**
 * 保单
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

const model = mysqlKit.define('policy',{
    policyNumber: {
        type: mysqlKit.string(50),
        unique: 'policyNumber',
        allowNull: false
    },
    applicant: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    insurant: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    mobile: {
        type: mysqlKit.char(11),
        allowNull: false
    },
    insuranceCompany: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    productName: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    policyGeneralImg: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    policyDetailImg: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    validity: {
        type: mysqlKit.date,
        allowNull: false,
        get: function()  {
            let value = this.getDataValue('validity')
            if (value) {
                return dateTimeKit.format(value)
            }
        }
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    }
})

module.exports = model