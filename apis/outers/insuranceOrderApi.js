/**
 * 保险下单Api
 *
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const insuranceOrderService = require(path.resolve(__dirname, '../../services/insuranceOrderService.js'))
const programmeService = require(path.resolve(__dirname, '../../services/programmeService.js'))
const orderService = require(path.resolve(__dirname, '../../services/orderService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/insuranceOrder', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('insuranceCompany').notBlank()
                ctx.checkBody('productName').notBlank()
                ctx.checkBody('dollar').notBlank()
                ctx.checkBody('paidYears').notBlank()
                ctx.checkBody('applicantSmoke').notBlank()

                ctx.checkBody('applicant').notBlank()
                ctx.checkBody('applicantSex').notBlank()
                ctx.checkBody('applicantNatinoality').notBlank()
                ctx.checkBody('applicantAge').notBlank()
                ctx.checkBody('applicantId').notBlank()

                ctx.checkBody('applicantPermit').notBlank()
                ctx.checkBody('applicantPassport').notBlank()
                ctx.checkBody('applicantCompany').notBlank()
                ctx.checkBody('applicantCompanyAddress').notBlank()
                ctx.checkBody('applicantJob').notBlank()

                ctx.checkBody('applicantPosition').notBlank()
                ctx.checkBody('applicantSalaryYear').notBlank()
                ctx.checkBody('applicantIdAddress').notBlank()
                ctx.checkBody('applicantAddress').notBlank()
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('hkDate').notBlank()
            })

            let insuranceCompany = ctx.request.body.insuranceCompany
            let productName = ctx.request.body.productName
            let dollar = ctx.request.body.dollar
            let paidYears = ctx.request.body.paidYears
            let applicantSmoke = ctx.request.body.applicantSmoke

            let applicant = ctx.request.body.applicant
            let applicantSex = ctx.request.body.applicantSex
            let applicantNatinoality = ctx.request.body.applicantNatinoality
            let applicantAge = ctx.request.body.applicantAge
            let applicantId = ctx.request.body.applicantId

            let applicantPermit = ctx.request.body.applicantPermit
            let applicantPassport = ctx.request.body.applicantPassport
            let applicantCompany = ctx.request.body.applicantCompany
            let applicantCompanyAddress = ctx.request.body.applicantCompanyAddress
            let applicantJob = ctx.request.body.applicantJob

            let applicantPosition = ctx.request.body.applicantPosition
            let applicantSalaryYear = ctx.request.body.applicantSalaryYear
            let applicantIdAddress = ctx.request.body.applicantIdAddress
            let applicantAddress = ctx.request.body.applicantAddress
            let insurant = ctx.request.body.insurant
            let insurantId = ctx.request.body.insurantId
            let insurantPermit = ctx.request.body.insurantPermit
            let insurantPassport = ctx.request.body.insurantPassport
            let insurantCompany = ctx.request.body.insurantCompany
            let insurantCompanyAddress = ctx.request.body.insurantCompanyAddress
            let insurantJob = ctx.request.body.insurantJob

            let insurantPosition = ctx.request.body.insurantPosition
            let insurantSalaryYear = ctx.request.body.insurantSalaryYear
            let insurantIdAddress = ctx.request.body.insurantIdAddress
            let insurantAddress = ctx.request.body.insurantAddress
            let insurantSmoke = ctx.request.body.insurantSmoke

            let insurantSex = ctx.request.body.insurantSex
            let relation = ctx.request.body.relation
            let insurantNatinoality = ctx.request.body.insurantNatinoality
            let insurantAge = ctx.request.body.insurantAge
            let beneficiaryList = ctx.request.body.favoree
            let hkDate = ctx.request.body.hkDate
            let userId = ctx.token.userId
            let orderId = ctx.request.body.orderId

            await insuranceOrderService.create(insuranceCompany, productName, dollar , paidYears, applicantSmoke,
                applicant, applicantSex, applicantNatinoality, applicantAge, applicantId, applicantPermit, applicantPassport,
                applicantCompany, applicantCompanyAddress, applicantJob, applicantPosition, applicantSalaryYear,
                applicantIdAddress, applicantAddress, insurant, insurantSex, relation, insurantNatinoality,insurantAge,
                insurantId, insurantPermit, insurantPassport, insurantCompany, insurantCompanyAddress, insurantJob,
                insurantPosition, insurantSalaryYear, insurantIdAddress, insurantAddress, insurantSmoke, beneficiaryList,
                hkDate, userId, orderId)

            ctx.api.success()
        })

        router.get('/insuranceOrder/find', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('orderId').notBlank()
            })

            let orderId = ctx.request.query.orderId

            let insuranceOrder = await insuranceOrderService.findByOrderId(orderId)

            ctx.api.success({
                insuranceOrder: insuranceOrder
            })
        })

        router.get('/insuranceOrder/findAll', async(ctx) => {

            let userId = ctx.token.userId

            let insuranceOrderList= await insuranceOrderService.findByUserId(userId)

            ctx.api.success({
                insuranceOrderList: insuranceOrderList
            })
        })

        router.get('/insuranceOrder/findAllStatus', async(ctx) => {

            let userId = ctx.token.userId
            let programmeList = await programmeService.findByUserIdStatus(userId)
            let list = []
            for(let i in programmeList){
                let  aa = programmeList[i]
                if(!aa.order.insurance_order){
                    list.push(programmeList[i])
                }
            }

            ctx.api.success({
                programmeList: list
            })
        })

        return router
    }
}

module.exports = new Api().router()