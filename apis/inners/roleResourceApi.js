/**
 * 角色资源关系Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const roleResourceService = require(path.resolve(__dirname, '../../services/roleResourceService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/roleResource', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('roleId').notBlank()
                ctx.checkBody('resourceIds').notBlank()
            })

            let roleId = ctx.request.body.roleId
            let resourceIds = ctx.request.body.resourceIds

            await roleResourceService.create(roleId, resourceIds)
            ctx.api.success()
        })

        router.delete('/roleResource/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await roleResourceService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()