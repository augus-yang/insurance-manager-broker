/**
 * 微信Service
 */

const path = require('path')
const digestKit = require(path.resolve(__dirname, '../kits/digestKit.js'))
const weixin = require(path.resolve(__dirname, '../models/weixin.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {
    /**
     * 创建
     * @param openId
     * @param name
     * @param mobile
     * @param pwd
     * @returns {Promise.<void>}
     */
    async create(openId, name, mobile, pwd) {
        let userCount = await super.getAllModel().user.count({
            where: {
                $or: {
                    name: name,
                    mobile: mobile
                }
            }
        })

        if (userCount > 0) {
            super.throwMessage('用户名或手机号已存在')
        }

        let role = await super.getAllModel().role.findOne({
            where: {
                name: 'user'
            }
        })

        await weixin.create({
            openId: openId,
            user: {
                name: name,
                pwd: digestKit.md5(pwd),
                mobile: mobile,
                roleId: role.id
            }
        }, {
            include: {
                model: super.getAllModel().user
            }
        })
    }

    /**
     * 根据userId查询
     * @param userId
     * @returns {Promise.<*>}
     */
    async findByUserId(userId) {
        return await weixin.findOne({
            where: {
                userId: userId
            }
        })
    }

    /**
     * 根据openIds查询
     * @param openIds
     * @returns {Promise.<*>}
     */
    async findByOpenIds(openIds) {
        return await weixin.findAll({
            order: 'createdAt desc',
            where: {
                openId: {
                    $in: openIds
                }
            }
        })
    }

    /**
     * 根据openId判断是否绑定
     * @param openId
     * @returns {Promise.<boolean>}
     */
    async isBindByOpenId(openId) {
        let count = await weixin.count({
            where: {
                openId: openId
            }
        })
        return count > 0
    }

    /**
     * 根据openId查询
     * @param openId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByOpenId(openId) {
        return await weixin.findOne({
            where: {
                openId: openId
            },
            include: {
                model: super.getAllModel().user
            }
        })
    }
}

module.exports = new Service(weixin)