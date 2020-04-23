module.exports = {
  success: (res, data) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data))
  },
  unprocessableEntity: (res, errors) => {
    res.status(422)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(errors))
  },
}
