const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports.createUser = (req, res) => {

  const { name, about, avatar, email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: 'Ошибка валидации Email' });
  }

  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы создания пользователя` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ message: 'Ошибка валидации Email' });
  }

  User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return user;
    });
  })
  .then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      '4896c10cdc1653614f09e73d4299ddcae7aa4bf7ab0e62211a08857947527149',
      { expiresIn: '7d' }
    );

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7 ,
      httpOnly: true
    })
    .status(200).send({ message: 'Авторизация прошла успешно' });
  })
  .catch((err) => {
    return res.status(401).send({ message: err.message });
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

module.exports.getMyInfo = (req, res) => {
  User.findById(req.user._id)
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

  if ( avatar && !avatar.includes("https://") && !avatar.includes("http://")) {
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