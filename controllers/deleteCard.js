const Card = require('../models/card');

module.exports.deleteCard = (req, res) => {

  Card.findByIdAndDelete(req.params.cardId)
  .orFail(() => {
    class NotFoundError extends Error {
      constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
      }
    }
    throw new NotFoundError('Карточка по указанному _id не найдена');
  })
  .then((card) => {
    res.status(200).send({ message: "Карточка удалена" });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: `Передан невалидный _id карточки` });
    }
    if (err.name === 'NotFoundError') {
      return res.status(404).send({ message: `${err.message}` });
    }
    console.log('Error:' + err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });
};