import { getPackedSettings } from 'http2';

const mosca = require('mosca')

const server = new mosca.Server({
  port: 1883,
  backend: {
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'nodebotanist-hub',
    mongo: {}
  }
})

server.on('ready', () => {
  console.log('MQTT Broker up and running!')
})

server.on('published', (packet, client) => {
  console.log(`Message: ${packet}\nClient:${client}\n\n`)
})

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
  setInterval(() => {
    server.publish('Hello', 'From the Raspi!')
  }, 5000)
});