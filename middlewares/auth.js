const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const token  = req.cookies.jwt;

  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    payload = jwt.verify(token, '4896c10cdc1653614f09e73d4299ddcae7aa4bf7ab0e62211a08857947527149');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();

};