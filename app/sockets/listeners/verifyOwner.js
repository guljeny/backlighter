const Devise = require('$app/models/Devise')
const { devisesStore } = require('../stores')

module.exports = async socket => {
  const uid = devisesStore.findBySocketId(socket.id)
  if (!uid) return
  const devise = await Devise.findBy({ uid })
  devise.setIsVerified()
}
