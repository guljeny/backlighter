const colorsys = require('colorsys')
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
      createdAt: Date.now(),
      enabled: true,
      bright: 255,
      colors: [[255, 100]],
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
    return new Proxy(this, {
      get: (target, name, receiver) => {
        if (this.device && this.device.hasOwnProperty(name)) {
          return this.device[name]
        }
        return Reflect.get(target, name, receiver)
      },
      set: (target, name, value, receiver) => {
        if (this.device && this.device.hasOwnProperty(name)) {
          this.device[name] = value
          const { uid } = this.device
          db.collection('devices').updateOne({ uid }, { $set: { [name]: value } })
        }
        Reflect.set(target, name, value, receiver)
        return true
      },
    })
  }

  restValues () {
    return getValues({
      ...this.device,
      isOnline: !!deviceStore.findByUid(this.uid),
    },
    restValues)
  }

  async update (values) {
    const { uid } = this
    await db.collection('devices').updateOne({ uid }, { $set: values })
    this.device = { ...this.device, ...values }
  }

  async updateFirmware () {
    notify.device(this.uid, deviceActions.updateFirmware)
  }

  notify () {
    const { uid, enabled, bright, colors } = this
    const colorsStr = colors.map(color => {
      const [h, s] = color
      const { r, g, b } = colorsys.hsvToRgb(h, s, bright)
      return `${r}/${g}/${b}`
    }).join('|')
    console.log('colors', colorsStr)
    notify.device(uid, deviceActions.setState, `${enabled ? 1 : 0}:${colorsStr}`)
  }
}
