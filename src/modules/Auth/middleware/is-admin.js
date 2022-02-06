const isAdmin = (req, res, next) => {
  if (req.user?.isAdmin) {
    console.log(req.user)
    next()
    return;
  }
  next(new Error('403 Access denied'))
}

module.exports = {
  isAdmin
}