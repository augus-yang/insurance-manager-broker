/**
 * 受益人Dtb
 */

const router = require('koa-router')()
const path = require('path')
const beneficiaryService = require(path.resolve(__dirname, '../services/beneficiaryService.js'))

router.post('/beneficiary/:insuranceOrderId', async(ctx) => {
    let insuranceOrderId = ctx.params.insuranceOrderId
    let name = ctx.request.body.name

    ctx.dtb.body.where.insuranceOrderId = insuranceOrderId
    if (name) {
        ctx.dtb.body.where.name = {
            like: '%' + name + '%'
        }
    }

    let dtb = await beneficiaryService.dtb(ctx.dtb.body)
    ctx.dtb.success(dtb)
})

module.exports = router
