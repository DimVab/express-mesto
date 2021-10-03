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
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};