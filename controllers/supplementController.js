/**
 * 预约赴港Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const supplementService = require(path.resolve(__dirname, '../services/supplementService.js'))

class Controller extends ControllerBase {
    router() {

        router.get('/supplement/:orderId', async(ctx) => {
            let orderId = ctx.params.orderId

            let bean = await supplementService.findByOrderId(orderId)
            ctx.controller.success({
                bean: bean
            })
        })

        router.get('/supplement/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await supplementService.findById(id)
            let supplementImgList = await supplementService.getAllModel().supplementImg.findAll({
                where: {
                    supplementId: bean.id
                }
            })
            ctx.controller.success('supplement/detail', {
                bean: bean,
                supplementImgList: supplementImgList
            })
        })

        return router
    }
}

module.exports = new Controller().router()