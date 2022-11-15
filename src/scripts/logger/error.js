const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [new winston.transports.File({ filename: path.join(__dirname, "../../", "logs/error", "error.log") })],
});

module.exports = logger;