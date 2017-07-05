/**
 * 角色Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const roleService = require(path.resolve(__dirname, '../../services/roleService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/role', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('describe').notBlank()
            })

            let name = ctx.request.body.name
            let describe = ctx.request.body.describe

            await roleService.create({
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

        router.put('/role/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('describe').notBlank()
            })

            let id = ctx.params.id
            let name = ctx.request.body.name
            let describe = ctx.request.body.describe

            await roleService.updateById(id, {
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

        router.delete('/role/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await roleService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()