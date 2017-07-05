/**
 * 角色资源关系Service
 */

const path = require('path')
const roleResource = require(path.resolve(__dirname, '../models/roleResource.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {
    /**
     * 创建
     * @param roleId
     * @param resourceIds
     * @returns {Promise.<void>}
     */
    async create(roleId, resourceIds) {
        let roleResources = []
        for (let i in resourceIds) {
            let rr = {}
            rr.roleId = roleId
            rr.resourceId = resourceIds[i]
            rr.getMethod = true
            rr.postMethod = true
            rr.putMethod = true
            rr.deleteMethod = true
            roleResources[i] = rr
        }

        await super.bulkCreate(roleResources, {
            where: {
                roleId: roleId,
                resourceId: {
                    $in: resourceIds
                }
            },
            errorMessage: '资源存在已绑定'
        })
    }
}

module.exports = new Service(roleResource)