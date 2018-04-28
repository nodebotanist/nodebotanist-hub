const tessel = require('tessel')
const j5 = require('johnny-five')
const tesselIO = require('tessel-io')
const mqtt = require('mqtt')

let board = j5.Board({
  io: new tesselIO()
})

board.on('ready', () => {
  console.log('Board ready!')
  let client = mqtt.connect('192.168.1.107', {
    port: 1883,
    protocol: 'ws'
  })

  client.on('connect', () => {
    console.log('MQTT client connected to broker')
    client.subscribe('Hello')
  })

  client.on('message', (topic, payload) => {
    console.log(topic + ': ' + payload.toString())
  })
})
