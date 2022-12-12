const ApiError = require("../scripts/utils/error");
const hs = require("http-status");

const idChecker = (req, res, next) => {
    console.log(req.params.id)
    if (!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError("Girmiş Olduğunuz id parametresi yanlış !", 401, 107)
    };


}


module.exports = idChecker;