/**
 * 角色Dtb
 */

const router = require('koa-router')()
const path = require('path')
const roleService = require(path.resolve(__dirname, '../services/roleService.js'))

router.post('/role', async(ctx) => {
    let name = ctx.request.body.name

    if (name) {
        ctx.dtb.body.where.name = {
            like: '%' + name + '%'
        }
    }

    let dtb = await roleService.dtb(ctx.dtb.body)
    ctx.dtb.success(dtb)
})

module.exports = router