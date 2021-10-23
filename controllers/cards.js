const Card = require('../models/card');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors/errors');

module.exports.createCard = (req, res, next) => {

  const { name, link } = req.body;

  if ( link && !link.includes("https://") && !link.includes("http://")) {
    throw new BadRequestError(`Передан некорректный адрес`);
  }

  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(user => res.status(200).send({ data: user }))
    .catch(next);
};


module.exports.getCards = (req, res, next) => {
  Card.find()
    .then(cards => res.status(200).send({ data: cards }))
    .catch(next);
};


module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка по указанному _id не найдена');
    })
    .then((card) => {;
      res.status(200).send({ data: card});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        err = new BadRequestError(`Передан невалидный _id карточки`);
      }
      next(err);
    });
};


module.exports.likeCard = (req, res, next) =>
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
    err = new BadRequestError(`Передан невалидный _id карточки`);
  }
  next(err);
});


module.exports.dislikeCard = (req, res, next) =>
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
    err = new BadRequestError(`Передан невалидный _id карточки`);
  }
  next(err);
});

module.exports.deleteCard = (req, res, next) => {
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
      throw new ForbiddenError('Вам запрещено удалять чужие карточки');
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      err = new BadRequestError(`Передан невалидный _id карточки`);
    }
    next(err);
  });
};