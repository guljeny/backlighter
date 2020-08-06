const path = require('path')
const app = require('$app/app')

module.exports = function bootstrapStaticServer () {
  app.get('/check_connection', (req, res) => { res.send('ok') })
  app.get('/esp8266/last/:type', (req, res) => {
    // const { type } = req.params
    res.sendFile(path.join(__dirname, '../dist/esp8266_firmware/rgb-pillar.bin'))
    // res.sendFile(path.join(__dirname, `../dist/esp8266_firmware/${type}.bin`))
  })

  app.get(/[\w|/]+\.\w+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client', req.url))
  })

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'))
  })
}
