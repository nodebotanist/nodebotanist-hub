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
  client = client || { id: 'N/A' }
  console.log(`Topic: ${packet.topic}\nMessage: ${packet.payload.toString()}\nClient:${client.id}\n\n`)
})

server.on('clientConnected', function(client) {
  console.log('client connected', client.id)
})