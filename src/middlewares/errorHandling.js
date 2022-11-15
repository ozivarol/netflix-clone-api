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
                errorCode: err.errorCode
            },
        });
        ErrorService.insert({
            level: "error",
            message: {
                success: false,
                message: err.message,
                errorCode: err.errorCode
            },
        })

        return res.status(err.statusCode || 400)
            .json({
                success: false,
                message: err.message,
                errorCode: err.errorCode




            })

    }
    return res.status(500).json({
        success: false,
        message: "Bir hata ile karşılaştık lütfen apinizi kontrol ediniz !"
    })
}

module.exports = errorHandlerMiddleware