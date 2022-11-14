const mongoose = require("mongoose")

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
        console.log(err)
        process.exit(1)
    })



}

module.exports = {
    connectDB,
}