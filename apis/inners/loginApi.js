/**
 * 登录Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const userService = require(path.resolve(__dirname, '../../services/userService.js'))
const roleService = require(path.resolve(__dirname, '../../services/roleService.js'))

class Api extends ControllerBase {
    router() {
        router.post('/login', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkBody('name').notBlank()
                ctx.checkBody('pwd').notBlank()
            })

            let name = ctx.request.body.name
            let pwd = ctx.request.body.pwd

            // 查询用户
            let user = await userService.findByNameAndPwd(name, pwd)

            // 查询角色
            let role = await roleService.findById(user.roleId, {
                include: {
                    model: roleService.getAllModel().resource
                }
            })

            // 格式化该角色拥有资源
            let beforeFormatResources = role.resources
            let afterFormatResources = []

            beforeFormatResources.forEach((resource) => {
                afterFormatResources.push(resource.name)
            })

            // 设置session
            ctx.session.login = {
                user: user,
                resources: afterFormatResources
            }
            ctx.api.success()
        })

        router.delete('/login', async(ctx) => {
            // 清除session
            ctx.session = null
            ctx.api.success()
        })

        return router
    }
}

module.exports = new Api().router()