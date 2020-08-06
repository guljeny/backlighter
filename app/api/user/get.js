const User = require('$models/User')

module.exports = async function get (req, res) {
  const user = await User.findBy({ id: req.session.userId })
  if (!user) {
    res.sendStatus.success()
    return
  }
  res.sendStatus.success(user.values())
}
