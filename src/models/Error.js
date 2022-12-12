const mongoose = require("mongoose")

const ErrorSchema = new mongoose.Schema({
    level: String,
    message: {
        errorCode: Number,
        message: String,
        success: Boolean
    },
    methodName: String

}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model("error", ErrorSchema)