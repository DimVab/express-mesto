const Card = require('../models/card');

module.exports.deleteCard = (req, res) => {

  Card.findByIdAndDelete(req.params.cardId)
  .then(card => res.status(200).send({message: 'Картинка удалена'}))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};