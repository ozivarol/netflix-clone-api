const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        unique: true,
        type: String
    },
    verify: Boolean
}, {
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model("user", UserSchema)