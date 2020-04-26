const response = require('$utils/response')

module.exports = async function logout (req, res) {
  req.session.userId = null
  response.success(res)
}
