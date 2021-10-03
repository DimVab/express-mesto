const User = require('../models/user');

module.exports.createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: `${err}, произошла ошибка` }));
};