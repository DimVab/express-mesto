const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } = require('../errors/errors');

module.exports.createUser = (req, res, next) => {

  const { name, about, avatar, email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new BadRequestError('Ошибка валидации Email');
  }

  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err = new BadRequestError(`Переданы некорректные данные в методы создания пользователя`);
      }
      if (err.name === "MongoServerError" && err.code === 11000) {
        err = new ConflictError('Такой emai уже существует');
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    throw new BadRequestError('Ошибка валидации Email');
  }

  User.findOne({ email }).select('+password')
  .then((user) => {
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
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
  .catch(next);

};


module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => res.status(200).send({ data: users }))
    .catch(next);
};


module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err = new BadRequestError('Передан невалидный _id пользователя');
      }
      next(err);
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
        err = new BadRequestError('Передан невалидный _id пользователя');
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {

  const { name, about } = req.body;
  const userId = req.user._id;

  if (!name || !about) {
    throw new BadRequestError(`Переданы некорректные данные в методы изменения пользователя`);
  }

  User.findByIdAndUpdate(userId, { name: name, about: about },
    {
      new: true,
      runValidators: true
    }
    )
    .then(user => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        err = new BadRequestError(`Переданы некорректные данные в методы изменения пользователя`);
      }
      next(err);
    });
};


module.exports.updateAvatar = (req, res, next) => {

  const { avatar } = req.body;

  if (!avatar || ( avatar && !avatar.includes("https://") && !avatar.includes("http://"))) {
    throw new BadRequestError(`Переданы некорректные данные в методы обновления аватара`);
  }
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar: avatar },
    {
      new: true,
      runValidators: true
    }
    )
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};