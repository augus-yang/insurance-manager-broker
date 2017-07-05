/**
 * 路由Middleware
 */

const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const apiInners = path.resolve(__dirname, '../apis/inners')
const apiOuters = path.resolve(__dirname, '../apis/outers')
const dtbs = path.resolve(__dirname, '../dtbs')
const controllers = path.resolve(__dirname, '../controllers')
const fileKit = require(path.resolve(__dirname, '../kits/fileKit.js'))

// api inner router
fs.readdirSync(apiInners).forEach((file) => {
    let apiInner = require(apiInners + '/' + file)
    router.use('/api/inner', apiInner.routes())
})

// api outer router
fs.readdirSync(apiOuters).forEach((file) => {
    let apiOuter = require(apiOuters + '/' + file)
    router.use('/api/outer', apiOuter.routes())
})

// dtb router
fs.readdirSync(dtbs).forEach((file) => {
    let dtb = require(dtbs + '/' + file)
    router.use('/dtb', dtb.routes())
})

// controller router
fs.readdirSync(controllers).forEach((file) => {
    let controller = require(controllers + '/' + file)
    router.use('', controller.routes())
})

const mid = () => {
    return router.routes()
}

module.exports = mid
