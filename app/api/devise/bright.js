const { ObjectId } = require('mongodb')
const response = require('$utils/response')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { usersStore } = require('$app/sockets/stores')
const socketIO = require('$app/socketIO')

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
  await devise.update({ bright })
  devise.notify()
  const users = usersStore.findByUserId(userId)
  if (users) {
    users.forEach(({ socketId }) => {
      socketIO.to(socketId).emit('DEVISES:UPDATE', { uid, bright })
    })
  }
  response.success(res)
}
