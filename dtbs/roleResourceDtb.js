/**
 * 角色资源关系Dtb
 */

const router = require('koa-router')()
const path = require('path')
const roleResourceService = require(path.resolve(__dirname, '../services/roleResourceService.js'))

router.post('/roleResource/:roleId', async(ctx) => {
    let roleId = ctx.params.roleId
    let name = ctx.request.body.name

    let count = await roleResourceService.count({
        where: {
            roleId: roleId
        }
    })

    if (name) {
        ctx.dtb.body.where.name = {
            like: '%' + name + '%'
        }
    }

    let role = await roleResourceService.getAllModel().role.findById(roleId)
    let resources = await role.getResources({
        order: 'createdAt desc',
        offset: ctx.dtb.body.start,
        limit: ctx.dtb.body.length,
        where: ctx.dtb.body.where
    })

    let dtb = {
        draw: ctx.dtb.body.draw,
        recordsTotal: count,
        recordsFiltered: resources.length,
        data: resources
    }
    ctx.dtb.success(dtb)
})

module.exports = router