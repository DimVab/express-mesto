const Card = require('../models/card');

module.exports.dislikeCard = (req, res) =>
 Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
.then(card => res.status(200).send({data: card}))
.catch(err => res.status(500).send({ message: 'Произошла ошибка' }));