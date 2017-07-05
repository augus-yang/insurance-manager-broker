/**
 * 登录超时Error
 */

const message = 'login time out'

class LoginTimeOutError extends Error {
    constructor() {
        super(message)
    }
}

module.exports = LoginTimeOutError
