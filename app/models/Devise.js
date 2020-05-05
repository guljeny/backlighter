const db = require('$db')

module.exports = class Devise {
  static async findBy (req) {
    const devise = await db.collection('divises').findOne(req)
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
      R: 255,
      G: 255,
      B: 255,
      ...rest,
    }
    const { ops } = await db.collection('divises').insertOne(data)
    return new Devise(ops[0])
  }

  static async listForOwner (owner) {
    const devises = await db.collection('divises')
      .find({ owner })
      .map(({
        name,
        uid,
        enabled,
        isOnline,
        bright,
        R,
        G,
        B,
      }) => ({
        name,
        uid,
        enabled,
        isOnline,
        bright,
        R,
        G,
        B,
      }))
      .toArray()
    return devises
  }

  constructor (devise) {
    if (!devise) throw new Error('no devise provided in Devise.constructor')
    this.devise = devise
  }

  get (key) {
    return this.devise[key]
  }

  async update (values) {
    const { uid } = this.devise
    await db.collection('divises').updateOne(
      { uid },
      { $set: values },
    )
    this.devise = { ...this.devise, ...values }
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
