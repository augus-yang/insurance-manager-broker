/**
 * 奖励Dtb
 */

const router = require('koa-router')()
const path = require('path')
const rewardService = require(path.resolve(__dirname, '../services/rewardService.js'))

router.post('/reward', async(ctx) => {
    let orderId = ctx.request.body.orderId

    let where = {}
    if (orderId) {
        where.id = {
            like: '%' + orderId + '%'
        }
    }

    let dtb = await rewardService.dtb(ctx.dtb.body, {
        include: [{
            model: rewardService.getAllModel().order,
            where: where
        },{model: rewardService.getAllModel().user}]
    })
    ctx.dtb.success(dtb)
})

module.exports = router
