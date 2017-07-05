/**
 * 注册Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const brokerService = require(path.resolve(__dirname, '../../services/brokerService.js'))
const userExtendService = require(path.resolve(__dirname, '../../services/userExtendService.js'))
const constantKit = require(path.resolve(__dirname, '../../kits/constantKit.js'))
const tokenKit = require(path.resolve(__dirname, '../../kits/tokenKit.js'))

class registerApi extends ControllerBase {
    router() {
        router.post('/register', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('pwd').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('captcha').notBlank()
                ctx.checkBody('pwd').notBlank()
                ctx.checkBody('applicant').notBlank()
                ctx.checkBody('applicantType').notBlank()
                ctx.checkBody('documentType').notBlank()
                ctx.checkBody('documentNumber').notBlank()
                ctx.checkBody('address').notBlank()
                ctx.checkBody('documentFrontImage').notBlank()
                ctx.checkBody('documentBackImage').notBlank()
                ctx.checkBody('invitation').notBlank()
            })
            let name = ctx.request.body.name
            let mobile = ctx.request.body.mobile
            let captcha = ctx.request.body.captcha
            let pwd = ctx.request.body.pwd

            let applicant = ctx.request.body.applicant
            let applicantType = ctx.request.body.applicantType
            let documentType = ctx.request.body.documentType
            let documentNumber = ctx.request.body.documentNumber
            let address = ctx.request.body.address
            let documentFrontImage = ctx.request.body.documentFrontImage
            let documentBackImage = ctx.request.body.documentBackImage

            let invitation = ctx.request.body.invitation

            // 验证验证码
            await super.checkCaptcha(captcha, mobile)

            let userBroker = await brokerService.register(name, mobile, pwd, applicant, applicantType, documentType, documentNumber,
                address, documentFrontImage, documentBackImage)


            if(invitation){
                await userExtendService.create({
                    invitation: invitation,
                    userId: userBroker.user.id
                })

            }

            // 自动设置token
            let token = tokenKit.set({
                userId: userBroker.user.id
            })

            ctx.api.success({
                token: token,
                constants: constantKit.getAll()
            })
        })

        return router
    }

}

module.exports = new registerApi().router()