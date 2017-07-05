/**
 * 提现Dtb
 */

const router = require('koa-router')()
const path = require('path')
const withdrawalsService = require(path.resolve(__dirname, '../services/withdrawalsService.js'))

router.post('/withdrawals', async(ctx) => {
    let mobile = ctx.request.body.mobile

    let where = {}
    if (mobile) {
        where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    let dtb = await withdrawalsService.dtb(ctx.dtb.body, {
        include: [
            {
                model: withdrawalsService.getAllModel().account,
                include: {
                    model: withdrawalsService.getAllModel().user,
                    where: where
                }
            },
            {
                model: withdrawalsService.getAllModel().bank
            }
        ]
    })
    ctx.dtb.success(dtb)
})

module.exports = router
