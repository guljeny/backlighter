const { ObjectId } = require('mongodb')
const response = require('$utils/response')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { usersStore, devisesStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')
const { DEVISE_BRIGHT } = require('$app/sockets/actions')

module.exports = async function bright (req, res) {
  const { userId } = req.session
  const user = await User.findBy({ id: userId })
  if (!user) {
    response.unauthorized(res)
    return
  }
  const { bright, uid } = req.query
  const devise = await Devise.findBy({ uid })
  if (!devise || !ObjectId(userId).equals(devise.get('owner'))) {
    response.unprocessableEntity(res)
    return
  }
  devise.update({ bright })
  const users = usersStore.findByUserId(userId)
  if (users) {
    users.forEach(({ socketId }) => {
      socketIO.to(socketId).emit('DEVISES:UPDATE', { uid, bright })
    })
  }
  const socketId = devisesStore.findByUid(uid)
  if (socketId) {
    socketIO.to(socketId.last).emit(DEVISE_BRIGHT, bright)
  }
  response.success(res)
}
