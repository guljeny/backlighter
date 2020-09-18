require('./server')
const db = require('$utils/db')
const logger = require('$utils/logger')

async function initApplication (callback) {
  const err = await db.connect()
  if (err) throw new Error(err)
  callback()
  logger('starting app ...')
}

module.exports = initApplication
