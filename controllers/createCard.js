const Card = require('../models/card');

module.exports.createCard = (req, res) => {

  const { name, link } = req.body;
  const owner = req.user._id;

  console.log(owner);

  Card.create({ name, link, owner })
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: `${err}, произошла ошибка` }));
};