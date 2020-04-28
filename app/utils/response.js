module.exports = {
  success: (res, data = {}) => {
    res.status(200)
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
  },
  unauthorized: res => {
    res.status(401)
    res.end()
  },
  unprocessableEntity: (res, errors = {}) => {
    res.status(422)
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(errors))
  },
  notFound: (res, errors = {}) => {
    res.status(404)
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(errors))
  },
}
