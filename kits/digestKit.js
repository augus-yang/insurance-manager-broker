/**
 * 加密Kit
 */

const crypto = require('crypto')

function digest(str, hash) {
    return crypto.createHash(hash).update(str).digest('hex')
}

module.exports = this

/**
 * md5加密
 * @param str
 * @returns {*}
 */
this.md5 = (str) => {
    return digest(str, 'md5')
}