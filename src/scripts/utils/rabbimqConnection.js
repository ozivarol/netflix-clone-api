const amqp = require("amqplib")

require('dotenv').config()



async function connect_rabbitmq(data) {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION)
    const channel = await connection.createChannel()
    await channel.assertQueue("emailQueue")
    console.log(data)

    channel.consume("emailQueue", data => {
        let adress = data.content.toString()
        let content = `${adress} ile netflixclone'a kayıt olduğunuz için teşekkür ederiz.`
        console.log("Mail", content)

        channel.ack(data)
    })

}

async function add_queue(data) {
    const connection = await amqp.connect(process.env.RABBIT_CONNECTION)
    const channel = await connection.createChannel()
    await channel.assertQueue("emailQueue")

    channel.sendToQueue("emailQueue", Buffer.from(JSON.stringify(data)))

}

module.exports = {
    connect_rabbitmq,
    add_queue
}