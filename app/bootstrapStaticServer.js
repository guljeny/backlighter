const path = require('path')

module.exports = function bootstrapStaticServer (app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client/index.html'))
  })

  app.get(/[\w|/]+\.\w+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/client', req.url))
  })
}
