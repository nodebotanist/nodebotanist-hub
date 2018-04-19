const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://192.168.1.107:1883')
 
client.on('connect', function () {
  // client.subscribe('presence')
  // client.publish('presence', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})