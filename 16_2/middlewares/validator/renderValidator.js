const RequiredMiddleware = function (req, res, next) {
  if (req.body) {
    next();
  }
};

module.exports = { RequiredMiddleware };
