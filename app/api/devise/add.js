const validateForm = require('$utils/validateForm')
const response = require('$utils/response')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { devisesStore } = require('$app/sockets/stores')
const { common: { VERIFY_OWNER } } = require('$app/sockets/actions')
const socketIO = require('$app/socketIO')

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
  const socketId = devisesStore.findByUid(uid)
  if (socketId) {
    socketIO.to(socketId.last).emit(VERIFY_OWNER)
  }
  response.success(res)
}
