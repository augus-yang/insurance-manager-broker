/**
 * 微信绑定推广用户Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const weixinExtendService = require(path.resolve(__dirname, '../../services/weixinExtendService.js'))

class weixinExtendApi extends ControllerBase {
    router() {
        router.post('/weixinExtend', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('openId').notBlank()
                ctx.checkBody('invitation').notBlank()
            })

            let openId = ctx.request.body.openId
            let invitation = ctx.request.body.invitation

            // 判断用户是否已经绑定过，如果绑定过则修改邀请码
            let weixinExtend = await weixinExtendService.findByOpenId(openId)

            if(weixinExtend) {
                await weixinExtendService.updateById(weixinExtend.id, {
                    invitation: invitation
                })
            } else {
                // 判断用户是否是自己绑定自己
                let weixin = await weixinExtendService.getAllModel().weixin.findOne({
                    where: {
                        openId: openId
                    }
                })
                if(weixin){
                    let broker = await weixinExtendService.getAllModel().broker.findOne({
                        where: {
                            userId: weixin.userId
                        }
                    })
                    if(broker && broker.invitation === invitation){
                        // 直接返回
                        ctx.api.success()
                        return
                    }
                }

                await weixinExtendService.create({
                    openId: openId,
                    invitation: invitation
                })
            }

            ctx.api.success()
        })

        return router
    }
}

module.exports = new weixinExtendApi().router()