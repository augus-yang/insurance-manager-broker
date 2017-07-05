/**
 * 上传Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))

class Api extends ControllerBase {
    router() {
        router.post('/upload', super.getUpload().single('upload'), async(ctx) => {
            let fileName = '/uploads/' + ctx.req.file.filename
            ctx.api.success({
                fileName: fileName
            })
        })

        return router
    }
}

module.exports = new Api().router()