/**
 * mysqlKit
 */

const Sequelize = require('sequelize')
const uuid = require('uuid')
const path = require('path')
const mysql = require(path.resolve(__dirname, '../configs') + "/" + process.env.NODE_ENV + '/mysql.json')
const dateTimeKit = require(__dirname + '/dateTimeKit.js')

/**
 * 创建sequelize实例
 */
const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    port: mysql.port,
    dialect: mysql.dialect,
    timezone: mysql.timezone
})

module.exports = this

/**
 * 定义模型
 * @param table
 * @param fields
 * @param opts
 * @returns {Model}
 */
this.define = (table, fields, opts) => {
    let bean = {}
    bean.id = {
        type: Sequelize.STRING(50),
        primaryKey: true
    }
    for (let key in fields) {
        bean[key] = fields[key]
    }

    opts = opts || {}
    opts.tableName = table
    opts.timestamps = true
    opts.hooks = {
        beforeCreate: function (bean) {
            bean.id = uuid.v4()
        },
        beforeBulkCreate: function (records) {
            for (let i in records) {
                records[i].id = uuid.v4()
            }
        }
    }
    opts.getterMethods = {
        createdAt: function () {
            let value = this.getDataValue('createdAt')
            if (value) {
                return dateTimeKit.format(value)
            }
        },
        updatedAt: function () {
            let value = this.getDataValue('updatedAt')
            if (value) {
                return dateTimeKit.format(value)
            }
        }
    }

    return sequelize.define(table, bean, opts)
}

/**
 * string
 * @param length
 * @returns {*}
 */
this.string = (length) => {
    return Sequelize.STRING(length)
}

/**
 * boolean
 * @type {*}
 */
this.boolean = Sequelize.BOOLEAN

/**
 * integer
 * @type {*}
 */
this.integer = Sequelize.INTEGER

/**
 * double
 */
this.double = Sequelize.DOUBLE(11, 2)

/**
 * char
 * @param length
 * @returns {*}
 */
this.char = (length) => {
    return Sequelize.CHAR(length)
}

/**
 * enum
 * @type {*}
 */
this.enum = Sequelize.ENUM

/**
 * date
 * @type {*}
 */
this.date = Sequelize.DATE

/**
 * 事务
 * @param transaction
 */
this.transaction = async(transaction) => {
    await sequelize.transaction(transaction).catch((err) => {
        throw new Error(err.message)
    })
}