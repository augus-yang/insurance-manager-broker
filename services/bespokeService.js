/**
 * 预约服务Service
 */

const path = require('path')
const bespoke = require(path.resolve(__dirname, '../models/bespoke.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class BespokeService extends ServiceBase {

    /**
     * 根据userId 查询所有预约服务
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await bespoke.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            }
        })
    }

}

module.exports = new BespokeService(bespoke)