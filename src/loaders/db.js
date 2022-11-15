const mongoose = require("mongoose")
const ApiError = require("../scripts/utils/error");
const db = mongoose.connection


const connectDB = async () => {
    db.once("open", () => {
        console.log("Database bağlantısı başarılı")

    })


    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }).then(() => {
        console.log(`MongoDB connected  ${db.host}`)
    }

    ).catch(err => {
        throw new ApiError("Database bağlantı hatası !", 500, 101)
    })



}

module.exports = {
    connectDB,
}