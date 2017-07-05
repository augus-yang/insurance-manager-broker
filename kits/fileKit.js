/**
 * 文件Kit
 */

module.exports = this

/**
 * 获取文件后缀名
 * @param fileName
 * @returns {string|*}
 */
this.suffix = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length)
}

/**
 * 获取文件名
 * @param fileName
 * @returns {string|*}
 */
this.name = (fileName) => {
    return fileName.substring(0, fileName.lastIndexOf('.'))
}