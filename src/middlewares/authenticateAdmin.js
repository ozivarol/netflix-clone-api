const JWT = require("jsonwebtoken");
const hs = require("http-status");
const ApiError = require("../scripts/utils/error");


const authenticateToken = (req, res, next) => {
    const token = req.headers?.token
    if (!token) {
        return next(new ApiError("Sorun oldu"))
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {

        if (!user?._doc?.isAdmin) {
            throw new ApiError("Bu işlemi yapabilmeniz için admin olmanı gerekiyor !", 401, 109)
        }
        if (err) {
            throw new ApiError("Bir hata oluştu !", 401, 103)
        }
        req.user = user?._doc;
        next();
    })
}

module.exports = authenticateToken;