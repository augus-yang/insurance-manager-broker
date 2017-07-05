/**
 * 角色Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const roleService = require(path.resolve(__dirname, '../services/roleService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/role/page', async (ctx) => {
            ctx.controller.success('role/page')
        })

        router.get('/role/create', async (ctx) => {
            ctx.controller.success('role/create')
        })

        router.get('/role/update/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await roleService.findById(id, {
                include: {
                    model: roleService.getAllModel().resource
                }
            })

            ctx.controller.success('role/update', {
                bean: bean
            })
        })

        router.get('/role/detail/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await roleService.findById(id, {
                include: {
                    model: roleService.getAllModel().resource
                }
            })

            ctx.controller.success('role/detail', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()