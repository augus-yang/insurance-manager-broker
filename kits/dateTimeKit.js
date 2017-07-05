/**
 * 日期Kit
 */

const moment = require('moment')

function add(value, type, opts) {
    opts = opts || {}
    let formatter = opts.formatter || 'YYYY-MM-DD HH:mm:ss'
    if (!opts.dateTime) {
        return moment().add(value, type).format(formatter)
    } else {
        return moment(opts.dateTime).add(value, type).format(formatter)
    }
}

module.exports = this

/**
 * 获取当前时间
 * @returns {*|moment.Moment}
 */
this.now = () => {
    return moment()
}

/**
 * 格式化时间
 * @param dateTime
 * @param formatter
 * @returns {string}
 */
this.format = (dateTime, formatter) => {
    formatter = formatter || 'YYYY-MM-DD HH:mm:ss'
    return moment(dateTime).format(formatter)
}

/**
 * 转换时间
 * @param dateTimeStr
 * @returns {Date}
 */
this.parse = (dateTimeStr) => {
    return moment(dateTimeStr).toDate()
}

/**
 * 增加年
 * @param year
 * @param opts
 * @returns {*}
 */
this.plusYear = (year, opts) => {
    return add(year, 'years', opts)
}