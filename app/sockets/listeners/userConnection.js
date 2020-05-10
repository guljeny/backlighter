const { ObjectID } = require('mongodb')
const User = require('$app/models/User')
const Devise = require('$app/models/Devise')
const { devisesStore, usersStore } = require('../stores')
const { user: { UPDATE_DEVISE } } = require('../actions')

module.exports = async (id, socket) => {
  const user = await User.findBy({ id })
  if (!user) return
  usersStore.addItem({ id, socketId: socket.id })
  const list = await Devise.listForOwner(ObjectID(id))
  list.forEach(({ uid }) => {
    socket.emit(UPDATE_DEVISE, { uid, isOnline: !!devisesStore.findByUid(uid) })
  })
}
