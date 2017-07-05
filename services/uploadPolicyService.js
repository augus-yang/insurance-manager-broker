/**
 * 上传保单Service
 */

const path = require('path')
const uploadPolicy = require(path.resolve(__dirname, '../models/uploadPolicy.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))
const insuranceOrderService = require(__dirname+ '/insuranceOrderService.js')
const userService = require(__dirname + '/userService.js')
const policyService = require(__dirname + '/policyService.js')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../kits/dateTimeKit.js'))

async function findUploadPolicy(orderId) {
    return await uploadPolicy.findAll({
        order: 'createdAt desc',
        where: {
            orderId: orderId
        }
    })
}

class Service extends ServiceBase {
    /**
     * 上传保单的同时创建一个保单托管的记录
     * @param policyPictureOne
     * @param policyPictureTwo
     * @param userId
     * @param orderId
     * @param policyNumber
     * @returns {Promise.<void>}
     */
    async create(policyPictureOne, policyPictureTwo, userId, orderId, policyNumber) {
        let array = []
        array[0] = {
            policyNumber: policyNumber,
            img: policyPictureOne,
            status: constantKit.getStatusType()[0],
            userId: userId,
            orderId: orderId
        }
        array[1] = {
            policyNumber: policyNumber,
            img: policyPictureTwo,
            status: constantKit.getStatusType()[0],
            userId: userId,
            orderId: orderId
        }

        await uploadPolicy.bulkCreate(array)
    }



    /**
     * 根据订单id查询
     * @param orderId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByOrderId(orderId) {
        return await findUploadPolicy(orderId)
    }

    /**
     * 根据用户id查询
     * @param userId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByUserId(userId) {
        return await uploadPolicy.findAll({
            where: {
                userId: userId
            }
        })
    }

    async updateByIdStatus(orderId) {
        await super.transaction(async(t) => {
            await uploadPolicy.update({
                status: constantKit.getStatusType()[1]
            }, {
                where: {
                    orderId: orderId

                },
                transaction: t
            })

            let insuranceOrder = await insuranceOrderService.findByOrderId(orderId)
            let upload = await findUploadPolicy(orderId)
            let user = await userService.findById(insuranceOrder.userId)

            await policyService.create({
                policyNumber: upload[0].policyNumber,
                applicant: insuranceOrder.applicant,
                insurant: insuranceOrder.insurant,
                mobile: user.mobile,
                insuranceCompany: insuranceOrder.insuranceCompany,
                productName: insuranceOrder.productName,
                policyGeneralImg: upload[0].img,
                policyDetailImg: upload[1].img,
                validity: dateTimeKit.plusYear(constantKit.getValidityType()),
                status: constantKit.getStatusType()[1],
                userId: insuranceOrder.userId
            }, {
                transaction: t
            })
        })
    }
}

module.exports = new Service(uploadPolicy)