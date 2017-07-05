/**
 * 保单Service
 */

const path = require('path')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const policy = require(path.resolve(__dirname, '../models/policy.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class policyService extends ServiceBase {
    /**
     * 前台分页列表
     * @param query
     * @returns {Promise.<*>}
     */
    async pageList(query) {
        return await super.findAndCount(query)
    }

    /**
     * 根据userId查询
     * @param userId
     * @returns {Promise.<*|Promise.<*>>}
     */
    async list(userId) {
        return await policy.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            }
        })
    }
}

module.exports = new policyService(policy)