/**
 * 推广Service
 */

const path = require('path')
const userExtend = require(path.resolve(__dirname, '../models/userExtend.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {

    /**
     * 根据邀请码查询
     * @param invitation
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByInvitation(invitation) {
        return await userExtend.findAll({
            order: 'createdAt desc',
            where: {
                invitation: invitation
            }
        })
    }
    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await userExtend.findOne({
            where: {
                userId: userId
            }
        })
    }


}

module.exports = new Service(userExtend)