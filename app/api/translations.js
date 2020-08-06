const requireYml = require('require-yml')

module.exports = async function translations (req, res) {
  const { locale } = req.params
  const locales = requireYml(`./locales/${locale}`)
  if (!locales) {
    res.sendStatus.notFound()
    return
  }
  res.sendStatus.success(locales)
}
