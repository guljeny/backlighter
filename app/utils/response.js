module.exports = {
  success: (res, data = {}) => {
    res.status(200)
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(JSON.stringify(data))
  },
  unprocessableEntity: (res, errors = {}) => {
    res.status(422)
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(JSON.stringify(errors))
  },
  notFound: (res, errors = {}) => {
    res.status(404)
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.send(JSON.stringify(errors))
  },
}
