const Devise = require('$app/models/Devise')
const notify = require('$utils/notify')
const { deviseStore } = require('../stores')
const { devise: deviseActions, deviseList } = require('../actions')

module.exports = async ({ uid, version, deviseType }, socket) => {
  deviseStore.addItem({ uid, id: socket.id })
  let devise = await Devise.findBy({ uid })
  if (!devise) devise = await Devise.add({ uid, version, deviseType })
  devise.update({ version })
  devise.notify()
  if (devise.get('newOwner')) notify.devise(uid, deviseActions.verifyOwner)
  notify.user(devise.get('owner'), deviseList.updateOne, { uid, isOnline: true, version })
}
