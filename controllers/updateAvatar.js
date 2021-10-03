const User = require('../models/user');

module.exports.updateAvatar = (req, res) => {

  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar: avatar },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
    )
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};