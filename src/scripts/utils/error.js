
class APIError extends Error {
    constructor(message, statusCode, errorCode, methodName) {
        super(message)
        this.statusCode = statusCode || 400
        this.errorCode = errorCode
        this.methodName = methodName

    }


}


module.exports = APIError