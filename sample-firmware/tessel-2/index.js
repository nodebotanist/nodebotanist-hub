const tessel = require('tessel')
const j5 = require('johnny-five')
const tesselIO = require('tessel-io')
const mqtt = require('mqtt')

let board = j5.Board({
  io: tesselIO
})

board.on('ready', () => {
  let client = mqtt.connect('nodebotanist-hub.local')

  client.on('connect', () => {
    client.subscribe('Hello')
    console.log('MQTT client connected to broker')
  })

  client.on('message', (topic, payload) => {
    console.log(topic + ': ' + payload.toString())
  })
})