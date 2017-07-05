/**
 * 添加银行卡Service
 */

const path = require('path')
const bank = require(path.resolve(__dirname, '../models/bank.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {

    /**
     * 根据用户Id查询
     * @param userId
     * @returns {Promise.<Promise|*>}
     */
    async findByUserId(userId) {
        return await bank.findOne({
            where:{
                userId: userId
            }
        })
    }

}

module.exports = new Service(bank)