/**
 * 获取方案Service
 */

const path = require('path')
const programme = require(path.resolve(__dirname, '../models/programme.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {

    async create(insurant, sex, birthday, smoke, product ,budget, userId, orderId) {
        let opts = {
            insurant: insurant,
            sex: sex,
            birthday: birthday,
            smoke: smoke,
            product: product,
            budget: budget,
            userId: userId,
            status: constantKit.getStatusType()[0]
        }

        let include = {}

        if(!orderId){
            opts.order = {
                status: constantKit.getOrderStatusType()[0],
                supplementStatus: false,
                userId: userId
            }

            include = {
                include: {
                    model: super.getAllModel().order
                }
            }
        } else {
            opts.orderId = orderId

            include = {}
        }

        await programme.create(opts, include)

    }

    /**
     * 根据订单id查询
     * @param orderId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByOrderId(orderId) {
        return await programme.findOne({
            where: {
                orderId: orderId
            }
        })
    }

    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await programme.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            }
        })
    }

    async findByUserIdOrder(userId) {
        return await programme.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            },
            include: {
                model: super.getAllModel().order,
                include: {
                    model: super.getAllModel().insuranceOrder
                }
            }

        })
    }

    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserIdStatus(userId) {
        return await programme.findAll({
            where: {
                userId: userId,
                status: constantKit.getStatusType()[1]
            },
            include: {
                model: super.getAllModel().order,
                where: {
                    status: constantKit.getOrderStatusType()[3]
                },
                include: {
                    model: super.getAllModel().insuranceOrder
                }
            }
        })
    }

}

module.exports = new Service(programme)