/**
 * 保险下单Service
 */

const path = require('path')
const constantKit = require(path.resolve(__dirname, '../kits/constantKit.js'))
const insuranceOrder = require(path.resolve(__dirname, '../models/insuranceOrder.js'))
const ServiceBase = require(path.resolve(__dirname, '../bases/serviceBase.js'))

class Service extends ServiceBase {

    async create(insuranceCompany, productName, dollar, paidYears, applicantSmoke, applicant,
                    applicantSex, applicantNatinoality, applicantAge, applicantId, applicantPermit, applicantPassport,
                    applicantCompany, applicantCompanyAddress, applicantJob, applicantPosition, applicantSalaryYear,
                    applicantIdAddress, applicantAddress, insurant, insurantSex, relation, insurantNatinoality, insurantAge,
                    insurantId, insurantPermit, insurantPassport, insurantCompany, insurantCompanyAddress, insurantJob,
                    insurantPosition, insurantSalaryYear, insurantIdAddress, insurantAddress, insurantSmoke, beneficiaryList,
                    hkDate, userId, orderId) {
        // 如果受保人就是投保人，关系就是本人
        if (applicant === insurant) {
            insurantSex = applicantSex
            relation = constantKit.getRelationType()[4]
            insurantNatinoality = applicantNatinoality
            insurantAge = applicantAge
            insurantId = applicantId
            insurantPermit = applicantPermit
            insurantPassport = applicantPassport
            insurantCompany = applicantCompany
            insurantCompanyAddress = applicantCompanyAddress
            insurantJob = applicantJob

            insurantPosition = applicantPosition
            insurantSalaryYear = applicantSalaryYear
            insurantIdAddress = applicantIdAddress
            insurantAddress = applicantAddress
            insurantSmoke = applicantSmoke
        }

        if(!orderId){
            await super.transaction(async(t) => {
                let data = await insuranceOrder.create({
                    insuranceCompany: insuranceCompany,
                    productName: productName,
                    dollar: dollar,
                    paidYears: paidYears,
                    applicantSmoke: applicantSmoke,
                    applicant: applicant,
                    applicantSex: applicantSex,
                    applicantNatinoality: applicantNatinoality,
                    applicantAge: applicantAge,
                    applicantId: applicantId,
                    applicantPermit: applicantPermit,
                    applicantPassport: applicantPassport,
                    applicantCompany: applicantCompany,
                    applicantCompanyAddress: applicantCompanyAddress,
                    applicantJob: applicantJob,
                    applicantPosition: applicantPosition,
                    applicantSalaryYear: applicantSalaryYear,
                    applicantIdAddress: applicantIdAddress,
                    applicantAddress: applicantAddress,
                    insurant: insurant,
                    insurantSex: insurantSex,
                    relation: relation,
                    insurantNatinoality: insurantNatinoality,
                    insurantAge: insurantAge,
                    insurantId: insurantId || '',
                    insurantPermit: insurantPermit || '',
                    insurantPassport: insurantPassport || '',
                    insurantCompany: insurantCompany,
                    insurantCompanyAddress: insurantCompanyAddress || '',
                    insurantJob: insurantJob || '',
                    insurantPosition: insurantPosition || '',
                    insurantSalaryYear: insurantSalaryYear || 0.00,
                    insurantIdAddress: insurantIdAddress || '',
                    insurantAddress: insurantAddress || '',
                    insurantSmoke: insurantSmoke || null,
                    hkDate: hkDate,
                    status: constantKit.getStatusType()[0],
                    userId: userId,
                    order: {
                        status: constantKit.getOrderStatusType()[0],
                        supplementStatus: false,
                        userId: userId
                    }
                }, {
                    include: {
                        model: super.getAllModel().order
                    }
                }, {
                    transaction: t
                })

                let beneficiarys = []
                for (let i in beneficiaryList) {
                    let be = {}
                    be.name = beneficiaryList[i].beneficiary
                    be.scale = beneficiaryList[i].scale
                    be.insuranceOrderId = data.id
                    beneficiarys[i] = be
                }

                await super.getAllModel().beneficiary.bulkCreate(beneficiarys, {
                    transaction: t
                })
            })
        }else {
            await super.transaction(async(t) => {
                let data = await insuranceOrder.create({
                    insuranceCompany: insuranceCompany,
                    productName: productName,
                    dollar: dollar,
                    paidYears: paidYears,
                    applicantSmoke: applicantSmoke,
                    applicant: applicant,
                    applicantSex: applicantSex,
                    applicantNatinoality: applicantNatinoality,
                    applicantAge: applicantAge,
                    applicantId: applicantId,
                    applicantPermit: applicantPermit,
                    applicantPassport: applicantPassport,
                    applicantCompany: applicantCompany,
                    applicantCompanyAddress: applicantCompanyAddress,
                    applicantJob: applicantJob,
                    applicantPosition: applicantPosition,
                    applicantSalaryYear: applicantSalaryYear,
                    applicantIdAddress: applicantIdAddress,
                    applicantAddress: applicantAddress,
                    insurant: insurant,
                    insurantSex: insurantSex,
                    relation: relation,
                    insurantNatinoality: insurantNatinoality,
                    insurantAge: insurantAge,
                    insurantId: insurantId || '',
                    insurantPermit: insurantPermit || '',
                    insurantPassport: insurantPassport || '',
                    insurantCompany: insurantCompany,
                    insurantCompanyAddress: insurantCompanyAddress || '',
                    insurantJob: insurantJob || '',
                    insurantPosition: insurantPosition || '',
                    insurantSalaryYear: insurantSalaryYear || 0.00,
                    insurantIdAddress: insurantIdAddress || '',
                    insurantAddress: insurantAddress || '',
                    insurantSmoke: insurantSmoke || null,
                    hkDate: hkDate,
                    status: constantKit.getStatusType()[0],
                    orderId: orderId,
                    userId: userId
                }, {
                    transaction: t
                })

                let beneficiarys = []
                for (let i in beneficiaryList) {
                    let be = {}
                    be.name = beneficiaryList[i].beneficiary
                    be.scale = beneficiaryList[i].scale
                    be.insuranceOrderId = data.id
                    beneficiarys[i] = be
                }

                await super.getAllModel().beneficiary.bulkCreate(beneficiarys, {
                    transaction: t
                })

            })
        }
    }

    /**
     * 根据id查询受益人
     * @param id
     * @returns {Promise.<*|Promise.<*>>}
     */
    async findBeneficiary(id) {
        let bean = await super.getAllModel().beneficiary.findAll({
            where:{
                insuranceOrderId: id
            }
        })

        return bean
    }

    /**
     * 更新
     * @param id
     * @param insuranceCompany
     * @param productName
     * @param dollar
     * @param paidYears
     * @param applicantSmoke
     * @param applicant
     * @param applicantSex
     * @param applicantNatinoality
     * @param applicantAge
     * @param applicantId
     * @param applicantPermit
     * @param applicantPassport
     * @param applicantCompany
     * @param applicantCompanyAddress
     * @param applicantJob
     * @param applicantPosition
     * @param applicantSalaryYear
     * @param applicantIdAddress
     * @param applicantAddress
     * @param insurant
     * @param insurantSex
     * @param relation
     * @param insurantNatinoality
     * @param insurantAge
     * @param insurantId
     * @param insurantPermit
     * @param insurantPassport
     * @param insurantCompany
     * @param insurantCompanyAddress
     * @param insurantJob
     * @param insurantPosition
     * @param insurantSalaryYear
     * @param insurantIdAddress
     * @param insurantAddress
     * @param insurantSmoke
     * @param hkDate
     * @returns {Promise.<*>}
     */
    async updateId(id, insuranceCompany, productName, dollar, paidYears, applicantSmoke, applicant,
                   applicantSex, applicantNatinoality, applicantAge, applicantId, applicantPermit, applicantPassport,
                   applicantCompany, applicantCompanyAddress, applicantJob, applicantPosition, applicantSalaryYear,
                   applicantIdAddress, applicantAddress, insurant, insurantSex, relation, insurantNatinoality, insurantAge,
                   insurantId, insurantPermit, insurantPassport, insurantCompany, insurantCompanyAddress, insurantJob,
                   insurantPosition, insurantSalaryYear, insurantIdAddress, insurantAddress, insurantSmoke,
                   hkDate) {
        await insuranceOrder.update({
            insuranceCompany: insuranceCompany,
            productName: productName,
            dollar: dollar,
            paidYears: paidYears,
            applicantSmoke: applicantSmoke,
            applicant: applicant,
            applicantSex: applicantSex,
            applicantNatinoality: applicantNatinoality,
            applicantAge: applicantAge,
            applicantId: applicantId,
            applicantPermit: applicantPermit,
            applicantPassport: applicantPassport,
            applicantCompany: applicantCompany,
            applicantCompanyAddress: applicantCompanyAddress,
            applicantJob: applicantJob,
            applicantPosition: applicantPosition,
            applicantSalaryYear: applicantSalaryYear,
            applicantIdAddress: applicantIdAddress,
            applicantAddress: applicantAddress,
            insurant: insurant,
            insurantSex: insurantSex,
            relation: relation,
            insurantNatinoality: insurantNatinoality,
            insurantAge: insurantAge,
            insurantId: insurantId || '',
            insurantPermit: insurantPermit || '',
            insurantPassport: insurantPassport || '',
            insurantCompany: insurantCompany,
            insurantCompanyAddress: insurantCompanyAddress || '',
            insurantJob: insurantJob || '',
            insurantPosition: insurantPosition || '',
            insurantSalaryYear: insurantSalaryYear || 0.00,
            insurantIdAddress: insurantIdAddress || '',
            insurantAddress: insurantAddress || '',
            insurantSmoke: insurantSmoke || null,
            hkDate: hkDate
        }, {
            where: {
                id: id
            }
        })
    }

    /**
     * 根据订单id查询
     * @param orderId
     * @returns {Promise.<Promise.<Promise|*>|*>}
     */
    async findByOrderId(orderId) {
        return await insuranceOrder.findOne({
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
        return await insuranceOrder.findAll({
            order: 'createdAt desc',
            where: {
                userId: userId
            },
            include: {
                model: super.getAllModel().beneficiary
            }
        })
    }
}

module.exports = new Service(insuranceOrder)