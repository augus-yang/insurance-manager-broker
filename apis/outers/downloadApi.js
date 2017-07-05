/**
 * 下载Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))

class Api extends ControllerBase {
    router() {
        router.get('/download', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('fileName').notBlank()
            })

            let fileName = ctx.request.query.fileName
            await super.download(ctx, fileName)
        })

        return router
    }
}

module.exports = new Api().router()