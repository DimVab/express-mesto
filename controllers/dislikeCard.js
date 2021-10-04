const Card = require('../models/card');

module.exports.dislikeCard = (req, res) =>
 Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
.then((card) => {
  if (!card) {
    return res.status(404).send({ message: `Передан несуществующий _id карточки` });
  }
  res.status(200).send({ data: card });
})
.catch((err) => {
  if (err.name === 'CastError') {
    return res.status(404).send({ message: `Передан несуществующий _id карточки` });
  }
  console.log('Error:' + err);
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
});