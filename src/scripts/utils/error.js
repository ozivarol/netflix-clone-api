
class APIError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message)
        this.statusCode = statusCode || 400
        this.errorCode = errorCode

    }


}


module.exports = APIError