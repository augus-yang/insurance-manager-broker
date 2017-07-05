/**
 * 受益人Service
 */

const path = require('path')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const beneficiary = require(path.resolve(__dirname, '../models/beneficiary.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {

    /**
     * 根据保险下单id查询
     * @param insuranceOrderId
     * @returns {Promise.<*|Promise.<*>>}
     */
    async findByInsuranceOrderId(insuranceOrderId) {
        return await beneficiary.findAll({
            order: 'createdAt desc',
            where:{
                insuranceOrderId: insuranceOrderId
            }
        })
    }
}

module.exports = new Service(beneficiary)