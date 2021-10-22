const Card = require('../models/card');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports.createCard = (req, res) => {

  const { name, link } = req.body;
  if ( link && !link.includes("https://") && !link.includes("http://")) {
    return  res.status(400).send({ message: `Передан некорректный адрес` });
  }
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы создания карточки` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};


module.exports.getCards = (req, res) => {
  Card.find()
    .then(cards => res.status(200).send({ data: cards }))
    .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};


module.exports.getCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка по указанному _id не найдена');
    })
    .then((card) => {;
      res.status(200).send({ data: card});
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


module.exports.likeCard = (req, res) =>
 Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true }
)
.orFail(() => {
  throw new NotFoundError('Карточка по указанному _id не найдена');
})
.then((card) => {
  res.status(200).send({ data: card });
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


module.exports.dislikeCard = (req, res) =>
 Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
.orFail(() => {
  throw new NotFoundError('Карточка по указанному _id не найдена');
})
.then((card) => {
  res.status(200).send({ data: card });
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

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
  .orFail(() => {
    throw new NotFoundError('Карточка по указанному _id не найдена');
  })
  .then((card) => {;
    return card.owner.toString();
  })
  .then((cardId) => {
    if (req.user._id === cardId) {
      Card.findByIdAndDelete(req.params.cardId)
      .then(() => {
        res.status(200).send({ message: "Карточка удалена" });
      });
    } else {
      res.status(403).send({ message: 'Вам запрещено удалять чужие карточки'});
    }
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