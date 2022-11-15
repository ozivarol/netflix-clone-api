const Info = require("../models/Info")
const BaseService = require("../services/BaseService")

class InfoService extends BaseService {
    constructor() {
        super(Info)
    }
}

module.exports = new InfoService()