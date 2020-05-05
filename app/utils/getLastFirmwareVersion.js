const fs = require('fs')

module.exports = () => new Promise(resolve => {
  fs.readFile('./src/esp8266_firmware/version.txt', 'utf-8', (err, version) => {
    if (err) resolve(null)
    resolve(version.replace(/\n/, ''))
  })
})
