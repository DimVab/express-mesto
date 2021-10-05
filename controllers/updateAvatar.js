const User = require('../models/user');

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