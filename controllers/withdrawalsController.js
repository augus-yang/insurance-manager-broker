/**
 * 提现Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const withdrawalsService = require(path.resolve(__dirname, '../services/withdrawalsService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/withdrawals/page', async(ctx) => {
            ctx.controller.success('withdrawals/page')
        })

        router.get('/withdrawals/detail/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await withdrawalsService.findById(id, {
                include: [
                    {
                        model: withdrawalsService.getAllModel().account,
                        include: {
                            model: withdrawalsService.getAllModel().user
                        }
                    },
                    {
                        model: withdrawalsService.getAllModel().bank
                    }
                ]
            })
            ctx.controller.success('withdrawals/detail', {
                bean: bean
            })
        })

        return router
    }
}

module.exports = new Controller().router()