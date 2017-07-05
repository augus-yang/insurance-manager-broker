/**
 * 资源Service
 */

const path = require('path')
const resource = require(path.resolve(__dirname, '../models/resource.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {
    /**
     * 查询所有未绑定该角色的资源
     * @param roleId
     * @returns {Promise.<*>}
     */
    async findAllNotBind(roleId) {
        let role = await super.getAllModel().role.findById(roleId, {
            include: {
                model: resource
            }
        })

        let where = {}

        let selected = []
        for (let i in role.resources) {
            selected[i] = role.resources[i].id
        }
        if (selected.length > 0) {
            where.id = {
                $notIn: selected
            }
        }

        return await super.findAll({
            where: where
        })
    }
}

module.exports = new Service(resource)