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
      ...rest,
    }
    const { ops } = await db.collection('divises').insertOne(data)
    return new Devise(ops[0])
  }

  constructor (devise) {
    if (!devise) throw new Error('no devise provided in Devise.constructor')
    this.devise = devise
  }

  getOwner () {
    return this.devise.owner
  }

  getNewOwner () {
    return this.devise.newOwner
  }

  getVersion () {
    return this.devise.version
  }

  async setVersion (version) {
    const { uid } = this.devise
    await db.collection('divises').updateOne(
      { uid },
      { $set: { version } },
    )
    this.devise.version = version
  }

  async addOwner (id) {
    const { uid } = this.devise
    await db.collection('divises').updateOne(
      { uid },
      { $set: { newOwner: id } },
    )
    this.devise.newOwner = id
  }

  isVerefied () {
    return this.devise.verified
  }

  async setIsVerified () {
    const { uid, newOwner } = this.devise
    const update = {
      verified: true,
      owner: newOwner,
      newOwner: null,
    }
    await db.collection('divises').updateOne(
      { uid },
      { $set: update },
    )
    this.devise = { ...this.devise, ...update }
  }
}
