/**
 * 用户Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const userService = require(path.resolve(__dirname, '../services/userService.js'))
const roleService = require(path.resolve(__dirname, '../services/roleService.js'))
const weixinService = require(path.resolve(__dirname, '../services/weixinService.js'))
const bankService = require(path.resolve(__dirname, '../services/bankService.js'))
const brokerService = require(path.resolve(__dirname, '../services/brokerService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/user/page', async(ctx) => {
            let list = await roleService.findAll()

            ctx.controller.success('user/page', {
                list: list
            })
        })

        router.get('/user/create', async(ctx) => {
            let list = await roleService.findAll()

            ctx.controller.success('user/create', {
                list: list
            })
        })

        router.get('/user/update/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await userService.findById(id, {
                include: {
                    model: userService.getAllModel().role
                }
            })

            let list = await roleService.findAll()

            ctx.controller.success('user/update', {
                bean: bean,
                list: list
            })
        })

        router.get('/user/resetPwd/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let bean = await userService.findById(id)

            ctx.controller.success('user/resetPwd', {
                bean: bean
            })
        })

        router.get('/user/detail/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            let user = await userService.findById(id, {
                include: {
                    model: userService.getAllModel().role
                }
            })

            let roleName = user.role.name

            let weixin = null
            let broker = null
            let bank = null

            // 如果是用户角色则显示openId
            if (roleName === 'user' || roleName === 'broker') {
                weixin = await weixinService.findByUserId(id)
                broker = await brokerService.findByUserId(id)
                bank = await bankService.findByUserId(id)
            }

            ctx.controller.success('user/detail', {
                user: user,
                weixin: weixin,
                broker: broker,
                bank: bank
            })
        })

        return router
    }
}

module.exports = new Controller().router()