/**
 * 补充资料Api
 */

const router = require('koa-router')()
const path = require('path')
const ControllerBase = require(path.resolve(__dirname, '../../bases/controllerBase.js'))
const supplementService = require(path.resolve(__dirname, '../../services/supplementService.js'))

class supplementApi extends ControllerBase {
    router() {
        router.delete('/supplement/:id', async(ctx) => {
            super.valid(ctx, () => {
                ctx.checkParams('id').notBlank()
            })

            let id = ctx.params.id

            await supplementService.delById(id)

            ctx.api.success()
        })

        return router
    }
}

module.exports = new supplementApi().router()