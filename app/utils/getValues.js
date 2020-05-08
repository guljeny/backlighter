module.exports = function (obj, values) {
  return values.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
}
