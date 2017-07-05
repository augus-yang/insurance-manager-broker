/**
 * 资源Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const resourceService = require(path.resolve(__dirname, '../../services/resourceService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/resource', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('describe').notBlank()
            })

            let name = ctx.request.body.name
            let describe = ctx.request.body.describe

            await resourceService.create({
                name: name,
                describe: describe
            }, {
                where: {
                    name: name
                },
                errorMessage: '名称已存在'
            })
            ctx.api.success()
        })

        router.put('/resource/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('describe').notBlank()
            })

            let id = ctx.params.id
            let name = ctx.request.body.name
            let describe = ctx.request.body.describe

            await resourceService.updateById(id, {
                name: name,
                describe: describe
            }, {
                where: {
                    name: name
                },
                errorMessage: '名称已存在'
            })
            ctx.api.success()
        })

        router.delete('/resource/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await resourceService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()