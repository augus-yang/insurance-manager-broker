/**
 * 登录Controller
 */

const router = require('koa-router')()

router.get('/login', async(ctx) => {
    ctx.controller.success('login')
})

module.exports = router