const cardsRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createCard, getCard, getCards, likeCard, dislikeCard, deleteCard } = require('../controllers/cards');

cardsRoutes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
  }),
}), createCard);


cardsRoutes.get('/cards', getCards);
cardsRoutes.get('/cards/:cardId', getCard);
cardsRoutes.put('/cards/:cardId/likes', likeCard);
cardsRoutes.delete('/cards/:cardId/likes', dislikeCard);
cardsRoutes.delete('/cards/:cardId', deleteCard);

module.exports = cardsRoutes;