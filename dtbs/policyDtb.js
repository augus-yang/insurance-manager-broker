/**
 * 保单托管Dtb
 */

const router = require('koa-router')()
const path = require('path')
const policyService = require(path.resolve(__dirname, '../services/policyService.js'))

router.post('/policy', async(ctx) => {
    let policyNumber = ctx.request.body.policyNumber
    let mobile = ctx.request.body.mobile

    if (policyNumber) {
        ctx.dtb.body.where.policyNumber = {
            like: '%' + policyNumber + '%'
        }
    }

    if (mobile) {
        ctx.dtb.body.where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    let dtb = await policyService.dtb(ctx.dtb.body, {
        include: {
            model: policyService.getAllModel().user
        }
    })
    ctx.dtb.success(dtb)
})

module.exports = router
