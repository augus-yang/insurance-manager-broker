/**
 * 微信api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const weixinKit = require(path.resolve(__dirname, '../../kits/weixinKit.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const weixinService = require(path.resolve(__dirname, '../../services/weixinService.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const userExtendService = require(path.resolve(__dirname, '../../services/userExtendService.js'))
const tokenKit = require(path.resolve(__dirname, '../../kits/tokenKit.js'))

class WeixinApi extends ControllerBase {
    router() {
        router.get('/weixin/init', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('redirectUri').notBlank()
            })

            let redirectUri = ctx.request.query.redirectUri

            let url = weixinKit.createURL(redirectUri)
            ctx.api.success(url)
        })

        router.get('/weixin/openId', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('code').notBlank()
            })

            let code = ctx.request.query.code

            let body = await weixinKit.getOpenId(code)

            ctx.api.success({
                openId: body.openId
            })
        })

        router.get('/weixin/user', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('code').notBlank()
            })

            let code = ctx.request.query.code

            let body = await weixinKit.getOpenId(code)

            let wechat = await weixinKit.getUser(body.openId, body.accessToken)

            let openId = wechat.user.openid

            // 判断openId是否与用户进行绑定过
            let isBind = await weixinService.isBindByOpenId(openId)

            // 如果绑定过，自动设置token
            if (isBind) {
                let token = await super.setToken(openId, weixinService.getAllModel())

                ctx.api.success({
                    isBind: isBind,
                    token: token,
                    user: wechat.user,
                    constants: constantKit.getAll()
                })
            } else {
                ctx.api.success({
                    isBind: isBind,
                    user: wechat.user
                })
            }
        })

        router.get('/weixin/isFollow', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('openId').notBlank()
            })

            let openId = ctx.request.query.openId

            let isFollow = await weixinKit.isFollow(openId)
            ctx.api.success({
                isFollow: isFollow
            })
        })

        router.post('/weixin/jssdk', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('url').notBlank()
            })

            let url = ctx.request.body.url

            let jssdk = await weixinKit.jssdk(url)
            ctx.api.success({
                jssdk: jssdk
            })
        })

        router.post('/weixin/bind', async(ctx) => {
            super.valid(ctx, () => {
                //ctx.checkBody('openId').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('captcha').notBlank()
                ctx.checkBody('pwd').notBlank()
            })

            //let openId = ctx.request.body.openId
            let name = ctx.request.body.name
            let mobile = ctx.request.body.mobile
            let captcha = ctx.request.body.captcha
            let pwd = ctx.request.body.pwd
            let invitation = ctx.request.body.invitation

            // 验证验证码
            await super.checkCaptcha(captcha, mobile)

            // 自动注册用户并绑定openId
           // await weixinService.create(openId, name, mobile, pwd)

            // 注册用户和推广绑定
            let user = await userService.createUser(invitation, name, mobile, pwd)

            // 自动设置token
            let token = tokenKit.set({
                userId: user.id
            })

            ctx.api.success({
                token: token,
                constants: constantKit.getAll()
            })
        })

        return router
    }
}

module.exports = new WeixinApi().router()