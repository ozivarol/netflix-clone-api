const mongoose = require("mongoose")

const InfoSchema = new mongoose.Schema({
    level: String,
    message: {
        data: Object,
        message: String,
        service: String
    },
    methodName: String

}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model("info", InfoSchema)