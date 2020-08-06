module.exports = function (obj, values) {
  const rest = { ...obj, id: obj._id }
  return values.reduce((acc, key) => ({ ...acc, [key]: rest[key] }), {})
}
