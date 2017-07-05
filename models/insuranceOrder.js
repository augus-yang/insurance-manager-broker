/**
 * 保险下单
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

const model = mysqlKit.define('insurance_order',{
    insuranceCompany: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    productName: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    dollar: {
        type: mysqlKit.double,
        allowNull: false
    },
    paidYears: {
        type: mysqlKit.integer,
        allowNull: false
    },
    applicantSmoke: {
        type: mysqlKit.boolean,
        allowNull: false
    },
    applicant: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantSex: {
        type: mysqlKit.enum,
        values: constantKit.getSexType(),
        allowNull: false
    },
    applicantNatinoality: {
        type: mysqlKit.enum,
        values: constantKit.getNationalityType(),
        allowNull: false
    },
    applicantAge: {
        type: mysqlKit.integer,
        allowNull: false
    },
    applicantId: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantPermit: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantPassport: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantCompany: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    applicantCompanyAddress: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    applicantJob: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantPosition: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    applicantSalaryYear: {
        type: mysqlKit.double,
        allowNull: false
    },
    applicantIdAddress: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    applicantAddress: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    insurant: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    insurantSex: {
        type: mysqlKit.enum,
        values: constantKit.getSexType(),
        allowNull: false
    },
    relation: {
        type: mysqlKit.enum,
        values: constantKit.getRelationType(),
        allowNull: false
    },
    insurantNatinoality: {
        type: mysqlKit.enum,
        values: constantKit.getNationalityType(),
        allowNull: false
    },
    insurantAge: {
        type: mysqlKit.integer,
        allowNull: false
    },
    insurantId: {
        type: mysqlKit.string(50),
        allowNull: true
    },
    insurantPermit: {
        type: mysqlKit.string(50),
        allowNull: true
    },
    insurantPassport: {
        type: mysqlKit.string(50),
        allowNull: true
    },
    insurantCompany: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    insurantCompanyAddress: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    insurantJob: {
        type: mysqlKit.string(50),
        allowNull: true
    },
    insurantPosition: {
        type: mysqlKit.string(50),
        allowNull: true
    },
    insurantSalaryYear: {
        type: mysqlKit.double,
        allowNull: true
    },
    insurantIdAddress: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    insurantAddress: {
        type: mysqlKit.string(200),
        allowNull: true
    },
    insurantSmoke: {
        type: mysqlKit.boolean,
        allowNull: true
    },
    hkDate: {
        type: mysqlKit.date,
        allowNull: false,
        get: function()  {
            let value = this.getDataValue('hkDate')
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