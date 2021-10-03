const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then(user => res.status(200).send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};