const User = require('../models/user');

module.exports.updateProfile = (req, res) => {

  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name: name, about: about },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
    )
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: `Пользователь по указанному _id не найден` });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы обновления профиля` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};