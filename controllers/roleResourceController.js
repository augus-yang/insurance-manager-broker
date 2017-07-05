/**
 * 角色资源关系Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const resourceService = require(path.resolve(__dirname, '../services/resourceService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/roleResource/create/:roleId', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('roleId').notBlank()
            })

            let roleId = ctx.params.roleId

            let list = await resourceService.findAllNotBind(roleId)

            ctx.controller.success('roleResource/create', {
                roleId: roleId,
                list: list
            })
        })

        return router
    }
}

module.exports = new Controller().router()