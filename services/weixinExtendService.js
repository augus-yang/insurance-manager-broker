/**
 * 微信绑定推广用户Service
 */

const path = require('path')
const digestKit = require(path.resolve(__dirname, '../kits/digestKit.js'))
const weixinExtend = require(path.resolve(__dirname, '../models/weixinExtend.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {
    /**
     * 根据邀请码查询
     * @param invitation
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByInvitation(invitation) {
        return await weixinExtend.findAll({
            order: 'createdAt desc',
            where: {
                invitation: invitation
            }
        })
    }

    async findByOpenId(openId) {
        return await weixinExtend.findOne({
            where: {
                openId: openId
            }
        })
    }
}

module.exports = new Service(weixinExtend)