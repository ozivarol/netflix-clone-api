const APIError = require("../scripts/utils/error")
const logger = require("../scripts/logger/error")
const ErrorService = require("../services/ErrorService")
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof APIError) {
        logger.log({
            level: "error",
            message: {
                success: false,
                message: err.message,
                statusCode: err.statusCode,
                errorCode: err.errorCode,
                methodName: err.methodName
            },
        });
        ErrorService.insert({
            level: "error",
            message: {
                success: false,
                message: err.message,
                statusCode: err.statusCode,
                errorCode: err.errorCode,
                methodName: err.methodName
            },
        })

        return res.status(err.statusCode || 400)
            .json({
                success: false,
                message: err.message,
                statusCode: err.statusCode,
                errorCode: err.errorCode,
                methodName: err.methodName





            })

    }
    return res.status(408).json({
        success: false,
        message: "Timeout.Bir hata ile karşılaştık lütfen apinizi kontrol ediniz. !"
    })
}

module.exports = errorHandlerMiddleware