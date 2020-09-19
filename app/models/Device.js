const db = require('$utils/db')
const notify = require('$utils/notify')
const getValues = require('$utils/getValues')
const { deviceStore } = require('$sockets/stores')
const { device: deviceActions } = require('$sockets/actions')

const restValues = ['name', 'uid', 'enabled', 'version', 'bright', 'colors', 'speed', 'deviceType', 'isOnline']

module.exports = class Device {
  static async findBy (req) {
    const device = await db.collection('devices').findOne(req)
    return device && new Device(device)
  }

  static async create ({ uid, owner = null, ...rest }) {
    if (!uid) throw new Error('cannot create device w/o uid')
    const data = {
      uid,
      owner,
      verified: false,
      addTime: Date.now(),
      enabled: true,
      bright: 255,
      colors: [[255, 0, 0]],
      ...rest,
    }
    const { ops } = await db.collection('devices').insertOne(data)
    return new Device(ops[0])
  }

  static async listForOwner (owner) {
    return db.collection('devices')
      .find({ owner })
      .map(val => getValues({ ...val, isOnline: !!deviceStore.findByUid(val.uid) }, restValues))
      .toArray()
  }

  constructor (device) {
    if (!device) throw new Error('no device provided in Device.constructor')
    this.device = device
  }

  get (key) {
    if (key) return this.device[key]
    return getValues(this.device, restValues)
  }

  async update (values) {
    const { uid } = this.device
    await db.collection('devices').updateOne({ uid }, { $set: getValues(values, restValues) })
    this.device = { ...this.device, ...values }
  }

  async updateFirmware () {
    const { uid } = this.device
    notify.device(uid, deviceActions.updateFirmware)
  }

  notify () {
    const { uid, enabled, bright, colors } = this.device
    const [r, g, b] = colors[0]
    notify.device(uid, deviceActions.setState, `${enabled ? 1 : 0}:${bright}:${r}:${g}:${b}`)
  }

  isVerefied () {
    return this.device.verified
  }

  async setIsVerified () {
    const { newOwner, newName } = this.device
    await this.update({
      verified: true,
      owner: newOwner,
      name: newName,
      newOwner: null,
      newName: null,
    })
  }
}
