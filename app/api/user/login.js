const User = require('$models/User')

module.exports = async function login (req, res) {
  const { email, password } = req.body
  const user = await User.findBy({ email, password })
  if (!user) {
    res.sendStatus.unprocessableEntity({ email: [], password: ['errors.user.wrong_data'] })
    return
  }
  const userData = user.restValues()
  req.session.userId = userData.id
  res.sendStatus.success(userData)
}
