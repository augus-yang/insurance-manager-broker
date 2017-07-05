/**
 * 添加银行卡Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const bankService = require(path.resolve(__dirname, '../../services/bankService.js'))

class bankApi extends ControllerBase {
    router() {
        router.post('/bank', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('openAccountBank').notBlank()
                ctx.checkBody('bankCard').notBlank()
            })

            let name = ctx.request.body.name
            let openAccountBank = ctx.request.body.openAccountBank
            let bankCard = ctx.request.body.bankCard
            let userId = ctx.token.userId
            let bank = await bankService.findByUserId(userId)
            if(!bank){
                await bankService.create({
                    name: name,
                    openAccountBank: openAccountBank,
                    bankCard: bankCard,
                    userId: userId
                }, {
                    where: {
                        bankCard: bankCard
                    },
                    errorMessage: '此卡号已存在'
                })
            } else {
                bankService.throwMessage('只能添加一张银行卡')
            }


            ctx.api.success()
        })

        router.put('/bank', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('openAccountBank').notBlank()
                ctx.checkBody('bankCard').notBlank()
            })

            let name = ctx.request.body.name
            let openAccountBank = ctx.request.body.openAccountBank
            let bankCard = ctx.request.body.bankCard
            let userId = ctx.token.userId
            let bank = await bankService.findByUserId(userId)

            await bankService.updateById(bank.id, {
                name: name,
                openAccountBank: openAccountBank,
                bankCard: bankCard
            })

            ctx.api.success()
        })

        router.get('/bank/find', async(ctx) => {

            let userId = ctx.token.userId
            let bank = await bankService.findByUserId(userId)

            ctx.api.success({
                bank: bank
            })
        })

        return router
    }
}

module.exports = new bankApi().router()