/**
 * 获取方案Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const programmeService = require(path.resolve(__dirname, '../../services/programmeService.js'))

class ProgrammeApi extends ControllerBase {
    router (){
        router.post('/programme/:orderId', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('orderId').notBlank()
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('sex').notBlank()
                ctx.checkBody('birthday').notBlank()
                ctx.checkBody('smoke').notBlank()
                ctx.checkBody('product').notBlank()
                ctx.checkBody('budget').notBlank()
            })

            let orderId = ctx.params.orderId
            let insurant = ctx.request.body.insurant
            let sex = ctx.request.body.sex
            let birthday = ctx.request.body.birthday
            let smoke = ctx.request.body.smoke
            let product = ctx.request.body.product
            let budget = ctx.request.body.budget
            let order = await programmeService.getAllModel().order.findById(orderId)
            let userId = order.userId
            await programmeService.create(insurant, sex, birthday, smoke, product, budget, userId, orderId)
            ctx.api.success()
        })

        router.put('/programme/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('insurant').notBlank()
                ctx.checkBody('sex').notBlank()
                ctx.checkBody('birthday').notBlank()
                ctx.checkBody('smoke').notBlank()
                ctx.checkBody('product').notBlank()
                ctx.checkBody('budget').notBlank()
            })

            let id = ctx.params.id
            let insurant = ctx.request.body.insurant
            let sex = ctx.request.body.sex
            let birthday = ctx.request.body.birthday
            let smoke = ctx.request.body.smoke
            let product = ctx.request.body.product
            let budget = ctx.request.body.budget

            await programmeService.updateById(id, {
                insurant: insurant,
                sex: sex,
                birthday: birthday,
                smoke: smoke,
                product: product,
                budget: budget
            })

            ctx.api.success()
        })

        router.put('/programme/:id/audit', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('audit').isIn(constantKit.getStatusType())
            })

            let id = ctx.params.id
            let audit = ctx.request.body.audit

            await programmeService.updateById(id, {
                status: audit
            })

            ctx.api.success()
        })

        router.delete('/programme/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await programmeService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new ProgrammeApi().router()