/**
 * 角色Service
 */

const path = require('path')
const role = require(path.resolve(__dirname, '../models/role.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {
    /**
     * 根据id删除
     * @param id
     * @returns {Promise.<void>}
     */
    async delById(id) {
        let role = await super.findById(id)
        let users = await role.getUsers()
        if (users.length > 0) {
            super.throwMessage('角色存在用户')
        }
        await super.delById(id)
    }
}

module.exports = new Service(role)