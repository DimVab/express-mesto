const cards = require('express').Router();

const { createCard } = require('../controllers/createCard');
const { getCard } = require('../controllers/getCard');
const { getCards } = require('../controllers/getCards');

cards.post('/cards', createCard);
cards.get('/cards', getCards);
cards.get('/cards/:cardId', getCard);

module.exports = cards;