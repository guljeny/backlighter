const User = require('$app/models/User')
const { usersStore } = require('../stores')

module.exports = async (id, socket) => {
  const user = await User.findBy({ id })
  if (!user) return
  usersStore.addItem({ id, socketId: socket.id })
}
