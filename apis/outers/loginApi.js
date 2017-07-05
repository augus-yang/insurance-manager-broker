/**
 * 登录Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const tokenKit = require(path.resolve(__dirname, '../../kits/tokenKit.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))

class loginApi extends ControllerBase {
    router() {
        router.post('/login/mobile', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('pwd').notBlank()
            })
            let mobile = ctx.request.body.mobile
            let pwd = ctx.request.body.pwd

            // 查询用户
            let user = await userService.findByMobileAndPwd(mobile, pwd)

            // 设置session
            ctx.session.login = {
                user: user
            }
            // 自动设置token
            let token = tokenKit.set({
                userId: user.id
            })
            ctx.api.success({
                token: token,
                user: user,
                constants: constantKit.getAll()
            })
        })

        router.post('/login/captcha', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('captcha').notBlank()
            })
            let mobile = ctx.request.body.mobile
            let captcha = ctx.request.body.captcha
            // 验证验证码
            await super.checkCaptcha(captcha, mobile)
            // 查询用户
            let user = await userService.findByMobileAndPwd(mobile)

            // 设置session
            ctx.session.login = {
                user: user
            }

            // 自动设置token
            let token = tokenKit.set({
                userId: user.id
            })
            ctx.api.success({
                token: token,
                user: user,
                constants: constantKit.getAll()
            })
        })

        return router
    }

}

module.exports = new loginApi().router()