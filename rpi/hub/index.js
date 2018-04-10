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
  console.log('MQTT Broker up ad running!')
})