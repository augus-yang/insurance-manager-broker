/**
 * 错误Controller
 */

const router = require('koa-router')()

router.get('/error', async(ctx) => {
    ctx.controller.success('error', {
        message: '系统异常'
    })
})

module.exports = router