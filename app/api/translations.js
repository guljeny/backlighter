const requireLocale = require('require-yml')
const response = require('$utils/response')

module.exports = async function translations (req, res) {
  const { locale } = req.params
  const locales = requireLocale(`./locales/${locale}`)
  if (!locales) {
    response.notFound(res)
    return
  }
  response.success(res, locales)
}
