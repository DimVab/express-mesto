const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      class NotFoundError extends Error {
        constructor(message) {
          super(message);
          this.name = 'NotFoundError';
          this.statusCode = 404;
        }
      }
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Передан невалидный _id пользователя` });
      }
      if (err.name === 'NotFoundError') {
        return res.status(404).send({ message: `${err.message}` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};