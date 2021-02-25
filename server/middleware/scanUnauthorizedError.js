function scanUnauthorizedError(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: err.message });
    return;
  }
  next();
}

module.exports = scanUnauthorizedError;
