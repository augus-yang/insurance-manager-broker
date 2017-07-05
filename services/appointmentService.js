/**
 * 预约赴港Service
 */

const path = require('path')
const appointment = require(path.resolve(__dirname, '../models/appointment.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))

class Service extends ServiceBase {
    /**
     * 根据订单id查询
     * @param orderId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByOrderId(orderId) {
        return await appointment.findOne({
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
        return await appointment.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            }
        })
    }

}

module.exports = new Service(appointment)