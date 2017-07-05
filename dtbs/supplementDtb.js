/**
 * 角色Dtb
 */

const router = require('koa-router')()
const path = require('path')
const supplementService = require(path.resolve(__dirname, '../services/supplementService.js'))

router.post('/supplement', async(ctx) => {


    let dtb = await supplementService.dtb(ctx.dtb.body)
    ctx.dtb.success(dtb)
})

module.exports = router