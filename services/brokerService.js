/**
 * 全民经纪Service
 */

const uuid = require('uuid')
const path = require('path')
const broker = require(path.resolve(__dirname, '../models/broker.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const digestKit = require(path.resolve(__dirname, '../kits/digestKit.js'))

class Service extends ServiceBase {
    /**
     * 创建
     * @param applicant
     * @param applicantType
     * @param documentType
     * @param documentNumber
     * @param address
     * @param documentFrontImage
     * @param documentBackImage
     * @param userId
     * @returns {Promise.<void>}
     */
    async create(applicant, applicantType, documentType, documentNumber,
                   address, documentFrontImage, documentBackImage, userId) {
        let count = await super.count({
            where: {
                $or: {
                    applicant: applicant,
                    documentNumber: documentNumber
                }
            }
        })

        if (count > 0) {
            super.throwMessage('申请人或证件号已存在')
        }

        return await broker.create({
            applicant: applicant,
            applicantType: applicantType,
            documentType: documentType,
            documentNumber: documentNumber,
            address: address,
            documentFrontImage: documentFrontImage,
            documentBackImage: documentBackImage,
            invitation: uuid.v4(),
            userId: userId,
            status: constantKit.getStatusType()[0]
        })

    }

    /**
     * 注册
     * @param name
     * @param mobile
     * @param pwd
     * @param applicant
     * @param applicantType
     * @param documentType
     * @param documentNumber
     * @param address
     * @param documentFrontImage
     * @param documentBackImage
     * @returns {Promise.<void>}
     */
    async register(name, mobile, pwd, applicant, applicantType, documentType, documentNumber,
                 address, documentFrontImage, documentBackImage) {
        let count = await super.count({
            where: {
                $or: {
                    applicant: applicant,
                    documentNumber: documentNumber
                }
            }
        })

        if (count > 0) {
            super.throwMessage('申请人或证件号已存在')
        }

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

        await broker.create({
            applicant: applicant,
            applicantType: applicantType,
            documentType: documentType,
            documentNumber: documentNumber,
            address: address,
            documentFrontImage: documentFrontImage,
            documentBackImage: documentBackImage,
            invitation: uuid.v4(),
            status: constantKit.getStatusType()[0],
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
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await broker.findOne({
            where: {
                userId: userId
            }
        })
    }

    async findByInvitation(invitation) {
        return await broker.findOne({
            where: {
                invitation: invitation
            }
        })
    }

    async updateStatus(id, status, sender, userId){

        let role = await super.getAllModel().role.findOne({
            where: {
                name: 'broker'
            }
        })

        // 审核通过
        if(status === constantKit.getStatusType()[1]){
            await super.transaction(async(t) => {
                // 修改全民经纪审核状态
                let updateBroker = await broker.update({
                    status: status
                }, {
                    where: {
                        id: id
                    },
                    transaction: t
                })

                // 修改用户角色
                let update = await super.getAllModel().user.update({
                    roleId: role.id
                }, {
                    where: {
                        id: userId
                    },
                    transaction: t
                })

                // 创建账户
                await super.getAllModel().account.create({
                    policyReward: 0.0,
                    extendReward: 0.0,
                    userId: userId
                }, {
                    transaction: t
                })

                // 推送最新信息
                await super.getAllModel().news.create({
                    total: '注册成功',
                    content: '注册全民经纪成功',
                    sender: sender,
                    receiver: userId,
                    status: false,
                }, {
                    transaction: t
                })

                if (updateBroker[0] === 0 || update[0] === 0) {
                    t.rollback()
                }
            })
        } else if(status === constantKit.getStatusType()[2]) { //审核未通过
            await super.transaction(async(t) => {
                // 删除全民经纪
                await broker.destroy({
                    where: {
                        id: id
                    },
                    transaction: t
                })

                // 推送最新信息
                await super.getAllModel().news.create({
                    total: '注册失败',
                    content: '注册全民经纪失败',
                    sender: sender,
                    receiver: userId,
                    status: false,
                }, {
                    transaction: t
                })
            })
        }

    }
}

module.exports = new Service(broker)