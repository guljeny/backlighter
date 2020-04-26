const validateForm = require('$utils/validateForm')
const response = require('$utils/response')
const User = require('$app/models/User')

module.exports = async function register (req, res) {
  const { email, password, repeatPassword } = req.body
  const errors = validateForm({ email, password, repeatPassword })
  if (errors) {
    response.unprocessableEntity(res, errors)
    return
  }
  const user = await User.findBy({ email })
  if (user) {
    response.unprocessableEntity(res, { email: ['errors.user.already_exists'] })
    return
  }
  const registeredUser = await User.register({ email, password })
  const userData = registeredUser.values()
  req.session.userId = userData.id
  response.success(res, userData)
}
