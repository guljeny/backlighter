const fs = require('fs')

let version = null
module.exports = () => new Promise(resolve => {
  if (version) resolve(version)
  fs.readFile('./src/esp8266_firmware/version.txt', 'utf-8', (err, _version) => {
    if (err) resolve(null)
    version = _version.replace(/\n/, '')
    resolve(version)
  })
})
