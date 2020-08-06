const { ObjectID } = require('mongodb')
const db = require('$utils/db')
const getValues = require('$utils/getValues')

const restValues = ['id', 'name']

module.exports = class Room {
  static async findBy (req) {
    if (req.hasOwnProperty('id')) {
      req._id = ObjectID(req.id)
      delete req.id
    }
    const room = await db.collection('rooms').findOne(req)
    return room && new Room(room)
  }

  static async add ({ owner, name }) {
    if (!owner || !name) throw new Error('no room owner or name provided')
    const data = { owner, name }
    const { ops } = await db.collection('rooms').insertOne(data)
    return new Room(ops[0])
  }

  static async listForOwner (owner) {
    return db.collection('rooms')
      .find({ owner })
      .map(val => getValues({ ...val }, restValues))
      .toArray()
  }

  constructor (room) {
    if (!room) throw new Error('no room provided in Room.constructor')
    this.room = room
  }

  get (key) {
    if (key) return this.room[key]
    return getValues(this.room, restValues)
  }

  async update (values) {
    const { uid } = this.room
    await db.collection('rooms').updateOne({ uid }, { $set: values })
    this.room = { ...this.room, ...values }
  }
}
