/**
 * 预约赴港Dtb
 */

const router = require('koa-router')()
const path = require('path')
const appointmentService = require(path.resolve(__dirname, '../services/appointmentService.js'))

router.post('/appointment', async(ctx) => {
    let mobile = ctx.request.body.mobile
    let flightNumber = ctx.request.body.flightNumber

    let where = {}
    if (mobile) {
        where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    if (flightNumber) {
        ctx.dtb.body.where.flightNumber = {
            like: '%' + flightNumber + '%'
        }
    }

    let dtb = await appointmentService.dtb(ctx.dtb.body, {
        include: {
            model: appointmentService.getAllModel().user,
            where: where
        }
    })
    ctx.dtb.success(dtb)
})

module.exports = router
