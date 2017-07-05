/**
 * 补充材料图片
 */

const path = require('path')
const mysqlKit = require(path.resolve(__dirname, '../kits/mysqlKit.js'))

const model = mysqlKit.define('supplement_img', {
    img: {
        type: mysqlKit.string(200),
        allowNull: false
    }
})

module.exports = model