/**
 * 全民经纪
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

const model = mysqlKit.define('broker',{
    applicant: {
        type: mysqlKit.string(50),
        unique: 'applicant',
        allowNull: false
    },
    applicantType: {
        type: mysqlKit.enum,
        values: constantKit.getApplicantTypes(),
        allowNull: false
    },
    documentType: {
        type: mysqlKit.enum,
        values: constantKit.getDocumentTypes(),
        allowNull: false
    },
    documentNumber: {
        type: mysqlKit.string(50),
        unique: 'documentNumber',
        allowNull: false
    },
    address: {
        type: mysqlKit.string(50),
        allowNull: false
    },
    documentFrontImage: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    documentBackImage: {
        type: mysqlKit.string(200),
        allowNull: false
    },
    invitation: {
        type: mysqlKit.string(50),
        unique: 'invitation',
        allowNull: false
    },
    status: {
        type: mysqlKit.enum,
        values: constantKit.getStatusType(),
        allowNull: false
    }
})

module.exports = model
