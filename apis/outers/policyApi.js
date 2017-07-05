/**
 * 保单Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const pageKit = require(path.resolve(__dirname, '../../kits/pageKit.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const dateTimeKit = require(path.resolve(__dirname, '../../kits/dateTimeKit.js'))
const policyService = require(path.resolve(__dirname, '../../services/policyService.js'))

class policyApi extends ControllerBase {
    router() {
        router.post('/policy', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('policyNumber').notBlank()
                ctx.checkBody('applicant').notBlank()
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('insuranceCompany').notBlank()
                ctx.checkBody('productName').notBlank()
                ctx.checkBody('policyGeneralImg').notBlank()
                ctx.checkBody('policyDetailImg').notBlank()
            })

            let policyNumber = ctx.request.body.policyNumber
            let applicant = ctx.request.body.applicant
            let insurant = ctx.request.body.insurant
            let mobile = ctx.request.body.mobile
            let insuranceCompany = ctx.request.body.insuranceCompany
            let productName = ctx.request.body.productName
            let policyGeneralImg = ctx.request.body.policyGeneralImg
            let policyDetailImg = ctx.request.body.policyDetailImg
            let userId = ctx.token.userId

            await policyService.create({
                policyNumber: policyNumber,
                applicant: applicant,
                insurant: insurant,
                mobile: mobile,
                insuranceCompany: insuranceCompany,
                productName: productName,
                policyGeneralImg: policyGeneralImg,
                policyDetailImg: policyDetailImg,
                validity: dateTimeKit.plusYear(constantKit.getValidityType()),
                status: constantKit.getStatusType()[0],
                userId: userId
            }, {
                where: {
                    policyNumber: policyNumber
                },
                errorMessage: '此保单已存在'
            })

            ctx.api.success()
        })

        // router.get('/policy/list', async(ctx) => {
        //     super.valid(ctx, () => {
        //         ctx.checkQuery('pageNumber').notBlank()
        //         ctx.checkQuery('pageSize').notBlank()
        //     })
        //
        //     let pageNumber = ctx.request.query.pageNumber
        //     let pageSize = ctx.request.query.pageSize
        //     let userId = ctx.token.userId
        //
        //     let pageFirst = pageKit.first(pageNumber, pageSize, {
        //         where: {
        //             userId: userId
        //         }
        //     })
        //
        //     let data = await policyService.pageList(pageFirst.query)
        //     let list = pageKit.last(pageFirst, data)
        //
        //     ctx.api.success({
        //         policyList: list
        //     })
        // })

        router.get('/policy/list', async(ctx) => {

            let userId = ctx.token.userId
            let list = await policyService.list(userId)

            ctx.api.success({
                policyList: list
            })
        })

        return router
    }
}

module.exports = new policyApi().router()