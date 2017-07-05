/**
 * 最新信息Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const newsService = require(path.resolve(__dirname, '../../services/newsService.js'))

class newsApi extends ControllerBase {
    router() {
        router.get('/news', async(ctx) => {
            let userId = ctx.token.userId

            let newsList = await newsService.findByUserId(userId)

            ctx.api.success({
                newsList: newsList
            })
        })

        router.get('/news/find', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkQuery('id').notBlank()
            })
            let id = ctx.request.query.id

            let news = await newsService.findById(id, {
                include:{
                    model: newsService.getAllModel().enclosure
                }
            })

            if(news.status == false){
                await newsService.updateById(id, {
                    status: true
                })
            }

            ctx.api.success({
                news: news
            })
        })

        router.get('/news/findStatus', async(ctx) => {
            let userId = ctx.token.userId

            let number = await newsService.count({
                where: {
                    receiver: userId,
                    status: false
                }
            })

            ctx.api.success({
                number: number
            })
        })

        return router
    }

}

module.exports = new newsApi().router()