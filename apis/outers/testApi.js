/**
 * 测试api
 */
const router = require('koa-router')()
const path = require('path')
const ServiceBase = require(path.resolve(__dirname, '../../bases/serviceBase.js'))
const yzxKit = require(path.resolve(__dirname, '../../kits/yzxKit.js'))

const serviceBase = new ServiceBase()

router.get('/test', async(ctx) => {
    yzxKit.send('123456', '15962968250')
    ctx.api.success('ok')
})

module.exports = router