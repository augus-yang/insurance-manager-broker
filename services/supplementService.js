/**
 * 奖励账户Service
 */

const path = require('path')
const supplement = require(path.resolve(__dirname, '../models/supplement.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {


    async createSupplement(orderId, pictureOne, pictureTwo, content) {
        await super.transaction(async(t) => {
        let data = await supplement.create({
            content: content || '',
            orderId: orderId

        }, {
            transaction: t
        })

        let array = []
        array[0] = {

            img: pictureOne || '',
            supplementId: data.id
        }
        array[1] = {
            img: pictureTwo || '',
            supplementId: data.id
        }

        await super.getAllModel().supplementImg.bulkCreate(array, {
            transaction: t
        })

    })
}

    async findByOrderId(orderId) {
        return await supplement.findAll({
            where: {
                orderId: orderId
            }
        })
    }

}

module.exports = new Service(supplement)