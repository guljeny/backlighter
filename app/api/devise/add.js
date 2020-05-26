const User = require('$models/User')
const Devise = require('$models/Devise')
const validateForm = require('$utils/validateForm')
const response = require('$utils/response')
const notify = require('$utils/notify')
const { deviseActions } = require('$sockets/actions')

module.exports = async function add (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const { uid, deviseName } = req.query
  const errors = validateForm({ uid, deviseName })
  if (errors) {
    response.unprocessableEntity(res, errors)
    return
  }
  let devise = await Devise.findBy({ uid })
  if (!devise) devise = await Devise.add({ uid })
  await devise.update({ newOwner: userId, newName: deviseName })
  notify.devise(uid, deviseActions.verifyOwner)
  response.success(res)
}
