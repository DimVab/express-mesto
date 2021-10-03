const users = require('express').Router();

const { createUser } = require('../controllers/createUser');
const { getUser } = require('../controllers/getUser');
const { getUsers } = require('../controllers/getUsers');

users.post('/users', createUser);
users.get('/users', getUsers);
users.get('/users/:userId', getUser);

module.exports = users;