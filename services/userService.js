/**
 * 用户Service
 */

const path = require('path')
const digestKit = require(path.resolve(__dirname, '../kits/digestKit.js'))
const user = require(path.resolve(__dirname, '../models/user.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const userExtendService = require(path.resolve(__dirname + '/userExtendService.js'))

class Service extends ServiceBase {

    /**
     * 创建
     * @param name
     * @param mobile
     * @param pwd
     * @returns {Promise.<void>}
     */
    async createUser(invitation, name, mobile, pwd) {
        let userCount = await user.count({
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

        let userModel = {}

        await super.transaction(async(t) => {
            userModel = await user.create({
                name: name,
                pwd: digestKit.md5(pwd),
                mobile: mobile,
                roleId: role.id

            }, {
                transaction: t
            })

            //用户绑定推广用户
            if(invitation){
                await userExtendService.create({
                    invitation: invitation,
                    userId: userModel.id
                }, {
                    transaction: t
                })
            }
        })

        return userModel
    }

    /**
     * 根据用户名跟密码查询
     * @param name
     * @param pwd
     * @returns {Promise.<*>}
     */
    async findByNameAndPwd(name, pwd) {
        let user = await super.findOne({
            where: {
                name: name,
                pwd: digestKit.md5(pwd)
            },
        })

        if (!user) {
            super.throwMessage('用户不存在')
        }
        return user
    }

    /**
     * 根据手机号和密码查询
     * @param mobile
     * @param pwd
     * @returns {Promise.<Promise|*>}
     */
    async findByMobileAndPwd(mobile, pwd) {
        let where = {
            mobile: mobile
        }

        if(pwd){
            where.pwd = digestKit.md5(pwd)
        }

        let user = await super.findOne({
            where: where,
            include: {
                model: super.getAllModel().broker
            }
        })

        if (!user) {
            super.throwMessage('用户名或密码错误')
        }
        return user
    }

    /**
     * 校验密码
     * @param id
     * @param pwd
     * @returns {Promise.<void>}
     */
    async checkPwd(id, pwd) {
        let user = await super.findById(id)

        if (!user || user.pwd !== digestKit.md5(pwd)) {
            super.throwMessage('用户不存在或者原始密码不正确')
        }
    }

    /**
     * 重置密码
     * @param id
     * @param pwd
     * @returns {Promise.<void>}
     */
    async updatePwd(id, pwd) {
        await super.updateById(id, {
            pwd: digestKit.md5(pwd)
        })
    }
}

module.exports = new Service(user)