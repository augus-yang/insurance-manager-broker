/**
 * 角色资源关系
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('role_resource')

module.exports = model
