/**
 * 全民经纪Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))
const bankService = require(path.resolve(__dirname, '../../services/bankService.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))

class InsuranceOrderApi extends ControllerBase {
    router (){
        router.get('/broker', async(ctx) => {
            let userId = ctx.token.userId

            let isBroker = '未申请'
            let broker = await brokerService.findByUserId(userId)
            if(broker){
                if(broker.status === constantKit.getStatusType()[0]
                    || broker.status === constantKit.getStatusType()[1]){
                    isBroker = broker.status
                }
            }

            ctx.api.success({
                isBroker: isBroker
            })
        })

        router.get('/broker/find', async(ctx) => {
            let userId = ctx.token.userId

            let broker = await brokerService.findByUserId(userId)
            let bank = await bankService.findByUserId(userId)

            ctx.api.success({
                broker: broker,
                bank: bank
            })
        })

        router.post('/broker', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('applicant').notBlank()
                ctx.checkBody('applicantType').notBlank()
                ctx.checkBody('documentType').notBlank()
                ctx.checkBody('documentNumber').notBlank()
                ctx.checkBody('address').notBlank()
                ctx.checkBody('documentFrontImage').notBlank()
                ctx.checkBody('documentBackImage').notBlank()
            })

            let applicant = ctx.request.body.applicant
            let applicantType = ctx.request.body.applicantType
            let documentType = ctx.request.body.documentType
            let documentNumber = ctx.request.body.documentNumber
            let address = ctx.request.body.address
            let documentFrontImage = ctx.request.body.documentFrontImage
            let documentBackImage = ctx.request.body.documentBackImage
            let userId = ctx.token.userId

           let broker = await brokerService.create(applicant, applicantType, documentType, documentNumber,
                address, documentFrontImage, documentBackImage, userId)

            ctx.api.success({
                invitation: broker.invitation
            })
        })

        return router
    }
}

module.exports = new InsuranceOrderApi().router()