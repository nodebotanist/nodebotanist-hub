const mosca = require('mosca')

const server = new mosca.Server({
  interfaces: [
    {
      type: 'ws',
      port: 1337
    }
  ],
  port: 1883,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: "mongodb://localhost:27017/mosca"
  },
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


server.on('clientConnected', function(client) {
	console.log('client connected', client.id);		
});