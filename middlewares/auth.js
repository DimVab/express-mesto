const jwt = require('jsonwebtoken');
const { ForbiddenError } = require('../errors/errors');

module.exports = (req, res, next) => {

  const token  = req.cookies.jwt;

  if (!token) {
    throw new ForbiddenError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, '4896c10cdc1653614f09e73d4299ddcae7aa4bf7ab0e62211a08857947527149');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      err = new ForbiddenError('Необходима авторизация');
    }
    next(err);
  }

  req.user = payload;

  next();

};