/**
 * 最新信息Controller
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../bases/controllerBase.js'))
const newsService = require(path.resolve(__dirname, '../services/newsService.js'))
const userService = require(path.resolve(__dirname, '../services/userService.js'))

class Controller extends ControllerBase {
    router() {
        router.get('/news/page', async(ctx) => {
            ctx.controller.success('news/page')
        })

        router.get('/news/create', async (ctx) => {
            ctx.controller.success('news/create')
        })

        router.get('/news/detail/:id', async(ctx) => {

            let id = ctx.params.id

            let bean = await newsService.findById(id, {
                include:{
                    model: newsService.getAllModel().enclosure
                }
            })
            let user = await userService.findById(bean.receiver)

            ctx.controller.success('news/detail', {
                news: bean,
                user: user
            })
        })

        router.get('/news/update/:id', async(ctx) => {
            let id = ctx.params.id

            let bean = await newsService.findById(id)
            let user = await userService.findById(bean.receiver)
            ctx.controller.success('news/update', {
                bean: bean,
                user: user

            })
        })

        return router
    }
}

module.exports = new Controller().router()