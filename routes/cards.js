const cards = require('express').Router();

const { createCard } = require('../controllers/createCard');
const { getCard } = require('../controllers/getCard');
const { getCards } = require('../controllers/getCards');
const { likeCard } = require('../controllers/likeCard');
const { dislikeCard } = require('../controllers/dislikeCard');
const { deleteCard } = require('../controllers/deleteCard');

cards.post('/cards', createCard);
cards.get('/cards', getCards);
cards.get('/cards/:cardId', getCard);
cards.put('/cards/:cardId/likes', likeCard);
cards.delete('/cards/:cardId/likes', dislikeCard);
cards.delete('/cards/:cardId', deleteCard);

module.exports = cards;