const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name:String,
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