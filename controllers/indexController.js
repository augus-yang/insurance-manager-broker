/**
 * 主页Controller
 */

const router = require('koa-router')()

router.get('/index', async(ctx) => {
    ctx.controller.success('index')
})

module.exports = router