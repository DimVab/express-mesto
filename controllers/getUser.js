const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};