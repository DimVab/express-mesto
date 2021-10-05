const cardsRoutes = require('express').Router();

const { createCard, getCard, getCards, likeCard, dislikeCard, deleteCard } = require('../controllers/cards');

cardsRoutes.post('/cards', createCard);
cardsRoutes.get('/cards', getCards);
cardsRoutes.get('/cards/:cardId', getCard);
cardsRoutes.put('/cards/:cardId/likes', likeCard);
cardsRoutes.delete('/cards/:cardId/likes', dislikeCard);
cardsRoutes.delete('/cards/:cardId', deleteCard);

module.exports = cardsRoutes;