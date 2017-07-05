/**
 * tokenKit
 */

const uuid = require('uuid')
const redisKit = require(__dirname + '/redisKit.js')

module.exports = this

/**
 * set
 * @param value
 * @returns {*}
 */
this.set = (value) => {
    let json = JSON.stringify(value)
    let token = uuid.v4()
    // token一天有效期
    redisKit.setEx('token_' + token, json, 24 * 60 * 60)
    return token
}

/**
 * get
 * @param key
 * @returns {Promise.<void>}
 */
this.get = async(key) => {
    let value = await redisKit.get('token_' + key)
    return JSON.parse(value)
}