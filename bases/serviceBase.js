/**
 * 基础Service
 */

const path = require('path')
const fs = require('fs')
const models = path.resolve(__dirname, '../models')
const CustomError = require(path.resolve(__dirname, '../errors/customError.js'))
const fileKit = require(path.resolve(__dirname, '../kits/fileKit.js'))
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const recordIsExistMessage = '记录已存在'
const defaultForeignKeyOption = {
    onDelete: 'CASCADE'
}
const model = {}

/**
 * 加载models文件夹所有模型
 */
fs.readdirSync(models).forEach((f) => {
    let name = fileKit.name(f)
    model[name] = require(models + '/' + f)
})

/**
 * 设置model相互间关系
 */
// 一个角色拥有多个用户
model.role.hasMany(model.user, defaultForeignKeyOption)
// 一个用户属于一个角色
model.user.belongsTo(model.role, defaultForeignKeyOption)
// 一个资源属于多个角色
model.resource.belongsToMany(model.role, {
    through: model.roleResource
})
// 一个角色拥有多个资源
model.role.belongsToMany(model.resource, {
    through: model.roleResource
})
// 微信属于用户
model.weixin.belongsTo(model.user, defaultForeignKeyOption)
// 全民经纪属于用户
model.broker.belongsTo(model.user, defaultForeignKeyOption)
// 用户拥有全民经纪
model.user.hasOne(model.broker, defaultForeignKeyOption)
// 奖励账户属于用户
model.account.belongsTo(model.user, defaultForeignKeyOption)
// 提现属于奖励账户
model.withdrawals.belongsTo(model.account, defaultForeignKeyOption)
// 提现属于银行卡
model.withdrawals.belongsTo(model.bank, defaultForeignKeyOption)
// 保单属于用户
model.policy.belongsTo(model.user, defaultForeignKeyOption)
// 预约服务属于用户
model.bespoke.belongsTo(model.user, defaultForeignKeyOption)
// 订单属于用户
model.order.belongsTo(model.user, defaultForeignKeyOption)
// 用户拥有订单
model.user.hasOne(model.order, defaultForeignKeyOption)
// 方案属于订单
model.programme.belongsTo(model.order, defaultForeignKeyOption)
// 方案属于用户
model.programme.belongsTo(model.user, defaultForeignKeyOption)
// 保险下单属于订单
model.insuranceOrder.belongsTo(model.order, defaultForeignKeyOption)
// 保险下单属于用户
model.insuranceOrder.belongsTo(model.user, defaultForeignKeyOption)
// 订单拥有保险下单
model.order.hasOne(model.insuranceOrder, defaultForeignKeyOption)
// 订单拥有预约赴港
model.order.hasOne(model.appointment, defaultForeignKeyOption)
// 保险下单拥有受益人
model.insuranceOrder.hasOne(model.beneficiary, defaultForeignKeyOption)
// 受益人属于保险下单
model.beneficiary.belongsTo(model.insuranceOrder, defaultForeignKeyOption)
// 上传保单属于订单
model.uploadPolicy.belongsTo(model.order, defaultForeignKeyOption)
// 上传保单属于用户
model.uploadPolicy.belongsTo(model.user, defaultForeignKeyOption)
// 预约赴港属于用户
model.appointment.belongsTo(model.user, defaultForeignKeyOption)
// 预约赴港属于订单
model.appointment.belongsTo(model.order, defaultForeignKeyOption)
// 银行卡属于用户
model.bank.belongsTo(model.user, defaultForeignKeyOption)
// 附件属于消息
model.enclosure.belongsTo(model.news, defaultForeignKeyOption)
// 消息拥有附件
model.news.hasOne(model.enclosure, defaultForeignKeyOption)

model.news.belongsTo(model.user, {foreignKey: 'sender', onDelete: 'CASCADE'})
model.news.belongsTo(model.user, {foreignKey: 'receiver', onDelete: 'CASCADE'})
// 奖励属于订单
model.reward.belongsTo(model.order, defaultForeignKeyOption)

// 奖励属于用户
model.reward.belongsTo(model.user, defaultForeignKeyOption)
// 补充材料内容属于订单
model.supplement.belongsTo(model.order, defaultForeignKeyOption)

model.supplement.hasOne(model.supplementImg, defaultForeignKeyOption)
// 补充材料图片属于内容
model.supplementImg.belongsTo(model.supplement, defaultForeignKeyOption)

class ServiceBase {
    constructor(model) {
        this.model = model
    }

    /**
     * 获取所有模型
     * @returns {{}}
     */
    getAllModel() {
        return model
    }

    /**
     * 抛出自定义异常
     * @param message
     */
    throwMessage(message) {
        throw new CustomError(message)
    }

    /**
     * 创建
     * @param bean
     * @param opts
     * @returns {Promise.<void>}
     */
    async create(bean, opts) {
        opts = opts || {}
        if (opts.where) {
            let count = await this.model.count({
                where: opts.where
            })

            if (count > 0) {
                throw new CustomError(opts.errorMessage || recordIsExistMessage)
            }
        }

        await this.model.create(bean)
    }

    /**
     * 批量创建
     * @param array
     * @param opts
     * @returns {Promise.<void>}
     */
    async bulkCreate(array, opts) {
        opts = opts || {}
        if (opts.where) {
            let count = await this.model.count({
                where: opts.where
            })

            if (count > 0) {
                throw new CustomError(opts.errorMessage || recordIsExistMessage)
            }
        }

        await this.model.bulkCreate(array)
    }

    /**
     * 根据id查询
     * @param id
     * @param opts
     * @returns {Promise.<Promise|*>}
     */
    async findById(id, opts) {
        return await this.model.findById(id, opts || {})
    }

    /**
     * 单个查询
     * @param opts
     * @returns {Promise.<Promise|*>}
     */
    async findOne(opts) {
        return await this.model.findOne(opts || {})
    }

    /**
     * 查询所有
     * @param opts
     * @returns {Promise.<*>}
     */
    async findAll(opts) {
        opts = opts || {}
        opts.order = 'createdAt desc'
        return await this.model.findAll(opts)
    }

    /**
     * findOrCreate
     * @param opts
     * @returns {Promise.<*>}
     */
    async findOrCreate(opts) {
        return await this.model.findOrCreate(opts || {})
    }

    /**
     * findAndCount
     * @param opts
     * @returns {Promise.<*>}
     */
    async findAndCount(opts) {
        return await this.model.findAndCount(opts || {})
    }

    /**
     * count
     * @param opts
     * @returns {Promise.<*>}
     */
    async count(opts) {
        return await this.model.count(opts || {})
    }

    /**
     * 根据id更新
     * @param id
     * @param bean
     * @param opts
     * @returns {Promise.<void>}
     */
    async updateById(id, bean, opts) {
        opts = opts || {}
        if (opts.where) {
            opts.where.id = {
                $notIn: [id]
            }

            let count = await this.model.count({
                where: opts.where
            })

            if (count > 0) {
                throw new CustomError(opts.errorMessage || recordIsExistMessage)
            }
        }

        await this.model.update(bean, {
            where: {
                id: id
            }
        })
    }

    /**
     * 根据id删除
     * @param id
     * @returns {Promise.<void>}
     */
    async delById(id) {
        await this.model.destroy({
            where: {
                id: id
            }
        })
    }

    /**
     * datatable
     * @param dtbBody
     * @param opts
     * @returns {Promise.<{draw, recordsTotal: *, recordsFiltered, data}>}
     */
    async dtb(dtbBody, opts) {
        let count = await this.model.count()

        opts = opts || {}
        opts.order = 'createdAt desc'
        opts.offset = dtbBody.start
        opts.limit = dtbBody.length
        opts.where = dtbBody.where

        let page = await this.model.findAndCountAll(opts)

        return {
            draw: dtbBody.draw,
            recordsTotal: count,
            recordsFiltered: page.count,
            data: page.rows
        }
    }

    /**
     * 事务
     * @param transaction
     */
    async transaction(transaction) {
        await mysqlKit.transaction(transaction)
    }
}

module.exports = ServiceBase