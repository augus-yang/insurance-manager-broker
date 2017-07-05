/**
 * redisKit
 */

const Redis = require('ioredis')
const path = require('path')
const res = require(path.resolve(__dirname, '../configs') + "/" + process.env.NODE_ENV + '/redis.json')

/**
 * 创建redis实例
 */
const redis = new Redis(res.port, res.host)

module.exports = this

/**
 * set
 * @param key
 * @param value
 */
this.set = (key, value) => {
    redis.set(key, value)
}

/**
 * setEx
 * @param key
 * @param value
 * @param time
 */
this.setEx = (key, value, time) => {
    redis.set(key, value, 'EX', time)
}

/**
 * get
 * @param key
 * @returns {Promise.<*>}
 */
this.get = async(key) => {
    return await redis.get(key)
}