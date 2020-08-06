module.exports = async function logout (req, res) {
  req.session.userId = null
  res.sendStatus.success()
}
