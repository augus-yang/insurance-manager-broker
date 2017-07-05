/**
 * 订单Dtb
 */

const router = require('koa-router')()
const path = require('path')
const orderService = require(path.resolve(__dirname, '../services/orderService.js'))

router.post('/order', async(ctx) => {
    let id = ctx.request.body.id
    let mobile = ctx.request.body.mobile
    let where = {}
    if (id) {
        ctx.dtb.body.where.id = {
            like: '%' + id + '%'
        }
    }

    if (mobile) {
        where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    let dtb = await orderService.dtb(ctx.dtb.body, {
        include: {
            model: orderService.getAllModel().user,
            where: where
        }
    })

    ctx.dtb.success(dtb)
})

module.exports = router
