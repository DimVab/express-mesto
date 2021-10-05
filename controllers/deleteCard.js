const Card = require('../models/card');

module.exports.deleteCard = (req, res) => {

  Card.findByIdAndDelete(req.params.cardId)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: `Карточка по указанному _id не найдена` });
    }
    res.status(200).send({ message: "Карточка удалена" });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: `Передан невалидный _id карточки` });
    }
    console.log('Error:' + err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });
};