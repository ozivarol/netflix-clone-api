const hs = require("http-status");
const JWT = require("jsonwebtoken");
const ApiError = require("../scripts/utils/error")
const authenticateToken = (req, res, next) => {


    const token = req.headers?.token;

    if (!token) {
        throw new ApiError("Bu işlemi yapabilmek için giriş yapmalısınız !", 401, 110)
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
            throw new ApiError("Token hatası !", 400, 111)
        }
        req.user = user;
        next();
    })

}



module.exports = authenticateToken;