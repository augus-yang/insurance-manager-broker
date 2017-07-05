/**
 * 最新信息Dtb
 */

const router = require('koa-router')()
const path = require('path')
const newsService = require(path.resolve(__dirname, '../services/newsService.js'))

router.post('/news', async(ctx) => {
    let mobile = ctx.request.body.mobile

    let where = {}
    if (mobile) {
        where.mobile = {
            like: '%' + mobile + '%'
        }
    }

    let dtb = await newsService.dtb(ctx.dtb.body, {
        include: {
            model: newsService.getAllModel().user,
            where: where
        }
    })

    ctx.dtb.success(dtb)
})

module.exports = router