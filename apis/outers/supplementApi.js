/**
 * 补充资料Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const supplementService = require(path.resolve(__dirname, '../../services/supplementService.js'))

class supplementApi extends ControllerBase {
    router() {
        router.post('/supplement', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('orderId').notBlank()
            })

            let pictureOne = ctx.request.body.pictureOne
            let pictureTwo = ctx.request.body.pictureTwo
            let content = ctx.request.body.content
            let orderId = ctx.request.body.orderId

            if(pictureOne === '' && pictureTwo === '' && content === ''){
                supplementService.throwMessage('验证失败')
            }else {
                await supplementService.createSupplement(orderId, pictureOne, pictureTwo, content)
            }

            ctx.api.success()
        })

        return router
    }
}

module.exports = new supplementApi().router()