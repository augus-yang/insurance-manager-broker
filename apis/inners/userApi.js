/**
 * 用户Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const digestKit = require(path.resolve(__dirname, '../../kits/digestKit.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))

// 默认密码
const defaultPwd = digestKit.md5('123456')

class Api extends ControllerBase {
    router() {
        router.post('/user', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('roleId').notBlank()
            })

            let name = ctx.request.body.name
            let mobile = ctx.request.body.mobile
            let roleId = ctx.request.body.roleId

            await userService.create({
                name: name,
                pwd: defaultPwd,
                mobile: mobile,
                roleId: roleId
            }, {
                where: {
                    $or: {
                        name: name,
                        mobile: mobile
                    }
                },
                errorMessage: '名称或者手机号已存在'
            })
            ctx.api.success()
        })

        router.put('/user/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('name').notBlank()
                ctx.checkBody('mobile').notBlank()
                ctx.checkBody('roleId').notBlank()
            })

            let id = ctx.params.id
            let name = ctx.request.body.name
            let mobile = ctx.request.body.mobile
            let roleId = ctx.request.body.roleId

            await userService.updateById(id, {
                name: name,
                mobile: mobile,
                roleId: roleId
            }, {
                where: {
                    $or: {
                        name: name,
                        mobile: mobile
                    }
                },
                errorMessage: '名称或者手机号已存在'
            })
            ctx.api.success()
        })

        router.get('/user/:id/pwd', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkQuery('oldPwd').notBlank()
            })

            let id = ctx.params.id
            let oldPwd = ctx.request.query.oldPwd

            await userService.checkPwd(id, oldPwd)
            ctx.api.success()
        })

        router.put('/user/:id/pwd', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
                ctx.checkBody('oldPwd').notBlank()
                ctx.checkBody('newPwd').notBlank()
            })

            let id = ctx.params.id
            let oldPwd = ctx.request.body.oldPwd
            let newPwd = ctx.request.body.newPwd

            await userService.checkPwd(id, oldPwd)
            await userService.updatePwd(id, newPwd)
            ctx.api.success()
        })

        router.delete('/user/:id', async (ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await userService.delById(id)
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()