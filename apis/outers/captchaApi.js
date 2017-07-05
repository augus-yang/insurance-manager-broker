/**
 * 验证码api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))

class CaptchaApi extends ControllerBase {
    router() {
        router.get('/captcha', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('mobile').notBlank()
            })

            let mobile = ctx.request.query.mobile

            await super.generateCaptcha(mobile);
            ctx.api.success()
        })

        return router
    }
}

module.exports = new CaptchaApi().router()