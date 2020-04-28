const response = require('$utils/response')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { devisesStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')

module.exports = async function add (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const { uid } = req.query
  if (!uid) {
    response.unprocessableEntity(res)
    return
  }
  let devise = await Devise.findBy({ uid })
  if (!devise) devise = await Devise.add({ uid })
  devise.addOwner(userId)
  const socketId = devisesStore.findByUid(uid)
  if (socketId) {
    socketIO.to(socketId).emit('VERIFY_OWNNER')
  }
  response.success(res)
}
