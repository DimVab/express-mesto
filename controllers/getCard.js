const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then(card => res.status(200).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};