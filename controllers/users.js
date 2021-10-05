const User = require('../models/user');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports.createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы создания пользователя` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};


module.exports.getUsers = (req, res) => {
  User.find()
    .then(users => res.status(200).send({ data: users }))
    .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};


module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
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


module.exports.updateProfile = (req, res) => {

  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name: name, about: about },
    {
      new: true,
      runValidators: true
    }
    )
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Передан невалидный _id пользователя` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы обновления профиля` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};


module.exports.updateAvatar = (req, res) => {

  const { avatar } = req.body;

  if ( avatar && !avatar.includes("https//:") && !avatar.includes("http//:")) {
    return  res.status(400).send({ message: `Переданы некорректные данные в методы обновления аватара` });
  }
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar: avatar },
    {
      new: true,
      runValidators: true
    }
    )
    .then((user) => {
      if (!avatar) {
        return  res.status(400).send({ message: `Переданы некорректные данные в методы обновления аватара` });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Передан невалидный _id пользователя` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы обновления аватара` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};