/**
 * 保险下单Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const beneficiaryService = require(path.resolve(__dirname, '../../services/beneficiaryService.js'))

class beneficiaryApi extends ControllerBase {
    router (){
        router.post('/beneficiary/create/:insuranceOrderId', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('insuranceOrderId').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('scale').notBlank()
            })
            let insuranceOrderId = ctx.params.insuranceOrderId
            let name = ctx.request.body.name
            let scale = ctx.request.body.scale

            await beneficiaryService.create({
                name: name,
                scale: scale,
                insuranceOrderId: insuranceOrderId
            }, {
                where: {
                    insuranceOrderId: insuranceOrderId,
                    name: name
                },
                errorMessage: '受益人已存在'
            })
            ctx.api.success()
        })

        router.put('/beneficiary/update/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('scale').notBlank()
            })

            let id = ctx.params.id
            let name = ctx.request.body.name
            let scale = ctx.request.body.scale

            await beneficiaryService.updateById(id, {
                name: name,
                scale: scale
            })

            ctx.api.success()
        })

        router.delete('/beneficiary/del/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await beneficiaryService.delById(id)
            ctx.api.success()
        })


        return router
    }
}

module.exports = new beneficiaryApi().router()