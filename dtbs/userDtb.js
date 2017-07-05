/**
 * 用户Dtb
 */

const router = require('koa-router')()
const path = require('path')
const userService = require(path.resolve(__dirname, '../services/userService.js'))

router.post('/user', async(ctx) => {
    let name = ctx.request.body.name
    let mobile = ctx.request.body.mobile
    let roleId = ctx.request.body.roleId

    if (name) {
        ctx.dtb.body.where.name = {
            like: '%' + name + '%'
        }
    }

    if (mobile) {
        ctx.dtb.body.where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    if (roleId) {
        ctx.dtb.body.where.roleId = roleId
    }

    let dtb = await userService.dtb(ctx.dtb.body, {
        include: {
            model: userService.getAllModel().role
        }
    })
    ctx.dtb.success(dtb)
})

module.exports = router