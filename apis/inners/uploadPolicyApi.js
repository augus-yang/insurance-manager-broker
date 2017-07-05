/**
 * 上传保单Api
 */

const router = require('koa-router')()
const path = require('path')
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const uploadPolicyService = require(path.resolve(__dirname, '../../services/uploadPolicyService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/uploadPolicy/:orderId', super.getUpload().single('upload'), async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('orderId').notBlank()
            })

            let orderId = ctx.params.orderId

            let fileName = '/uploads/' + ctx.req.file.filename

            uploadPolicyService.create({
                img: fileName,
                status: constantKit.getStatusType()[0],
                orderId: orderId
            })

            ctx.api.success()
        })

        router.put('/uploadPolicy/:orderId', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('orderId').notBlank()
            })

            let orderId = ctx.params.orderId


            await uploadPolicyService.updateByIdStatus(orderId)

            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()