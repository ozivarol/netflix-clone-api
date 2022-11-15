const User = require("../models/Error")
const BaseService = require("../services/BaseService")

class ErrorService extends BaseService {
    constructor() {
        super(User)
    }
}

module.exports = new ErrorService()