/**
 * 保单Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const policyService = require(path.resolve(__dirname, '../../services/policyService.js'))

class PolicyApi extends ControllerBase {
    router() {
        router.put('/policy/:id/audit', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('audit').isIn(constantKit.getStatusType())
            })

            let id = ctx.params.id
            let audit = ctx.request.body.audit

            await policyService.updateById(id, {
                status: audit
            })

            ctx.api.success()
        })

        router.put('/policy/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('policyNumber').notBlank()
                ctx.checkBody('applicant').notBlank()
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('insuranceCompany').notBlank()
                ctx.checkBody('productName').notBlank()
            })

            let id = ctx.params.id
            let policyNumber = ctx.request.body.policyNumber
            let applicant = ctx.request.body.applicant
            let insurant = ctx.request.body.insurant
            let mobile = ctx.request.body.mobile
            let insuranceCompany = ctx.request.body.insuranceCompany
            let productName = ctx.request.body.productName

            await policyService.updateById(id, {
                policyNumber: policyNumber,
                applicant: applicant,
                insurant: insurant,
                mobile: mobile,
                insuranceCompany: insuranceCompany,
                productName: productName
            })

            ctx.api.success()
        })

        return router
    }
}

module.exports = new PolicyApi().router()