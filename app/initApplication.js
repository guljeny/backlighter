const db = require('$db')

async function initApplication (callback) {
  const err = await db.connect()
  if (err) throw new Error(err)
  callback()
}

module.exports = initApplication
