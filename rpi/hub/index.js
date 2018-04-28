const mosca = require('mosca')
const mqtt = require('mqtt')
const dotenv = require('dotenv').config()

const server = new mosca.Server({
  port: 1883,
  backend: {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'nodebotanist-hub',
    mongo: {}
  }
})

const client = mqtt.connect(process.env.ADAFRUIT_IO_URL, {
  username: process.env.ADAFRUIT_IO_USERNAME,
  password: process.env.ADAFRUIT_IO_KEY,
  port: process.env.ADAFRUIT_IO_PORT
})

client.on('connect', function() {
  console.log('AdafruitIO client connected!')
  client.subscribe('kperch/feeds/twitter')
})

server.on('ready', () => {
  console.log('MQTT Broker up and running!')

  client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
  })
})

server.on('published', (packet, client) => {
  client = client || { id: 'N/A' }
  console.log(
    `Topic: ${packet.topic}\nMessage: ${packet.payload.toString()}\nClient:${
      client.id
    }\n\n`
  )
})

server.on('clientConnected', function(client) {
  console.log('client connected', client.id)
})
