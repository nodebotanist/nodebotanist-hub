const blacklist = require('metro/src/blacklist')
module.exports = {
  getBlacklistRE () {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}

const extraNodeModules = require('node-libs-browser')
 
// add any customisations 
extraNodeModules.net = require.resolve('react-native-tcp') 
 
module.exports = { 
  extraNodeModules 
}