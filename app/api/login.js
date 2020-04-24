const response = require('$utils/response')
const User = require('$app/models/User')

async function login (req, res) {
  const { email, password } = req.body
  const user = await User.findBy({ email, password })
  if (!user) {
    response.unprocessableEntity(res, { email: [], password: ['errors.user.wrong_data'] })
    return
  }
  const userData = user.values()
  req.session.userId = userData.id
  response.success(res, userData)
}

module.exports = login
