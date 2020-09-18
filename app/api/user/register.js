const User = require('$models/User')
const validateForm = require('$utils/validateForm')

module.exports = async function register (req, res) {
  const { email, password, repeatPassword } = req.body
  const errors = validateForm({ email, password, repeatPassword })
  if (errors) return res.sendStatus.unprocessableEntity(errors)
  const user = await User.findBy({ email })
  if (user) {
    return res.sendStatus.unprocessableEntity({ email: ['errors.user.already_exists'] })
  }
  const registeredUser = await User.register({ email, password })
  const userData = registeredUser.values()
  req.session.userId = userData.id
  res.sendStatus.success(userData)
}
