const response = require('$utils/response')
const User = require('$app/models/User')

module.exports = async function login (req, res) {
  const user = await User.findBy({ id: req.session.userId })
  if (!user) {
    response.success(res)
    return
  }
  response.success(res, user.values())
}
