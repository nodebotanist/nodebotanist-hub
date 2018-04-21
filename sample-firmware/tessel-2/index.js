const tessel = require('tessel')
const j5 = require('johnny-five')
const tesselIO = require('tessel-io')

let board = j5.Board({
  io: tesselIO
})

board.on('ready', () => {
  
})