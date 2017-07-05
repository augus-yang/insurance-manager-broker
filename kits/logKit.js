/**
 * 日志Kit
 */

const log4js = require("log4js")
const path = require('path')
const log4js_config = require(path.resolve(__dirname, '../configs/log4js.json'))
log4js.configure(log4js_config)
const logger = log4js.getLogger('file')

module.exports = this

/**
 * debug
 * @param message
 */
this.debug = (message) => {
    logger.debug(message)
}

/**
 * info
 * @param message
 */
this.info = (message) => {
    logger.info(message)
}

/**
 * error
 * @param message
 */
this.error = (message) => {
    logger.error(message)
}