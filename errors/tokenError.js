/**
 * tokenError
 */

const message = 'header not has token or token is invalid'

class TokenError extends Error {
    constructor() {
        super(message)
    }
}

module.exports = TokenError
