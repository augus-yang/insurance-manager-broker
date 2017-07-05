/**
 * 资源Dtb
 */

const router = require('koa-router')()
const path = require('path')
const resourceService = require(path.resolve(__dirname, '../services/resourceService.js'))

router.post('/resource', async(ctx) => {
    let name = ctx.request.body.name

    if (name) {
        ctx.dtb.body.where.name = {
            like: '%' + name + '%'
        }
    }

    let dtb = await resourceService.dtb(ctx.dtb.body)
    ctx.dtb.success(dtb)
})

module.exports = router