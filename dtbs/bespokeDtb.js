/**
 * 预约服务Dtb
 */

const router = require('koa-router')()
const path = require('path')
const bespokeService = require(path.resolve(__dirname, '../services/bespokeService.js'))

router.post('/bespoke', async(ctx) => {
    let mobile = ctx.request.body.mobile

    let where = {}
    if (mobile) {
        where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    let dtb = await bespokeService.dtb(ctx.dtb.body, {
        include: {
            model: bespokeService.getAllModel().user,
            where: where
        }
    })

    ctx.dtb.success(dtb)
})

module.exports = router