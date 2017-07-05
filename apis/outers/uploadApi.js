/**
 * 上传Api
 */

const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const weixinKit = require(path.resolve(__dirname, '../../kits/weixinKit.js'))

class Api extends ControllerBase {
    router() {
        router.post('/upload', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('mediaId').notBlank()
            })

            let mediaId = ctx.request.body.mediaId
            let fileName = await weixinKit.getTemporaryMedia(mediaId)
            ctx.api.success({
                fileName: '/uploads/' + fileName
            })
        })

        router.delete('/upload', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('fileName').notBlank()
            })

            let fileName = ctx.request.body.fileName

            fs.unlinkSync(path.resolve(__dirname, '../../statics' + fileName))
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()