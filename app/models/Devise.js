const db = require('$db')
const io = require('$app/socketIO')
const { devise: { DEVISE_STATUS } } = require('$app/sockets/actions')
const { devisesStore } = require('$app/sockets/stores')
const getValues = require('$app/utils/getValues')

const restValues = ['name', 'uid', 'enabled', 'version', 'bright', 'r', 'g', 'b', 'deviseType']

module.exports = class Devise {
  static async findBy (req) {
    const devise = await db.collection('devises').findOne(req)
    return devise && new Devise(devise)
  }

  static async add ({ uid, owner = null, ...rest }) {
    if (!uid) throw new Error('cannot add devise w/o uid')
    const data = {
      uid,
      owner,
      verified: false,
      addTime: Date.now(),
      enabled: true,
      bright: 255,
      r: 0,
      g: 255,
      b: 0,
      ...rest,
    }
    const { ops } = await db.collection('devises').insertOne(data)
    return new Devise(ops[0])
  }

  static async listForOwner (owner) {
    const devises = await db.collection('devises')
      .find({ owner })
      .map(val => getValues(val, restValues))
      .toArray()
    return devises.map(({ uid, ...rest }) => ({
      uid,
      ...rest,
      isOnline: !!devisesStore.findByUid(uid),
    }))
  }

  constructor (devise) {
    if (!devise) throw new Error('no devise provided in Devise.constructor')
    this.devise = devise
  }

  get (key) {
    if (key) return this.devise[key]
    return getValues(this.devise, restValues)
  }

  async update (values) {
    const { uid } = this.devise
    await db.collection('devises').updateOne(
      { uid },
      { $set: values },
    )
    this.devise = { ...this.devise, ...values }
  }

  async updateFirmware () {
    const { uid } = this.devise
    const socketId = devisesStore.findByUid(uid)
    if (!socketId) return
    io.to(socketId.last).emit('UPDATE_FIRMWARE')
  }

  notify () {
    const { uid, enabled, bright, r, g, b } = this.devise
    const socketId = devisesStore.findByUid(uid)
    if (!socketId) return
    io.to(socketId.last).emit(DEVISE_STATUS, `${enabled ? 1 : 0}:${bright}:${r}:${g}:${b}`)
  }

  isVerefied () {
    return this.devise.verified
  }

  async setIsVerified () {
    const { newOwner, newName } = this.devise
    await this.update({
      verified: true,
      owner: newOwner,
      name: newName,
      newOwner: null,
      newName: null,
    })
  }
}
