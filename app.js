require("express-async-errors")
const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const helmet = require("helmet")
const cors = require("cors");
const { UserRoutes } = require("./routers");
const errorHandlerMiddleware = require("./middlewares/errorHandling")
const event = require("./scripts/events")
const { connect_rabbitmq } = require("./scripts/utils/rabbimqConnection")
const ApiError = require("../src/scripts/utils/error");
const nodemon = require("nodemon")

config();
loaders();
event();
connect_rabbitmq()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(
    express.urlencoded({

        extended: false,
    })
)
app.use(cors({
    methods: "*",
    origin: "*",


}));


app.use(helmet())

app.use(errorHandlerMiddleware)
app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ${process.env.PORT}`)
    app.use("/user", UserRoutes, function (req, res, next) {
        console.log(req)

        throw new ApiError("Bu enpoint yok!", 401, 103, "main")

    })
    app.use(errorHandlerMiddleware)



})





app.get('/main', (req, res) => {
    res.json({
        message: "Hello, welcome to Netflix",
    });
})