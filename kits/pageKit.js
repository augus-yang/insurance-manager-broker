/**
 * 分页Kit
 */

module.exports = this

/**
 * 初始化分页
 * @param pageNumber
 * @param pageSize
 * @param query
 * @returns {{page: {pageNumber: (Number|number), pageSize: (Number|number)}, query: (*|{})}}
 */
this.first = (pageNumber, pageSize, query) => {
    let number = parseInt(pageNumber) || 1
    let size = parseInt(pageSize) || 10

    let page = {
        pageNumber: number,
        pageSize: size
    }

    query = query || {}
    query.order = 'createdAt desc'
    query.offset = (number - 1) * size
    query.limit = size

    return {
        page: page,
        query: query
    }
}

/**
 * 完成分页
 * @param first
 * @param data
 * @returns {{pageNumber, pageSize, totalPage: number, data}}
 */
this.last = (first, data) => {
    let count = data.count
    let number = parseInt(count / first.page.pageSize) + 1

    return {
        pageNumber: first.page.pageNumber,
        pageSize: first.page.pageSize,
        totalPage: number,
        data: data.rows
    }
}