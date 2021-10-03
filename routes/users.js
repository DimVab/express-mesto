const users = require('express').Router();

const { createUser } = require('../controllers/createUser');
const { getUser } = require('../controllers/getUser');
const { getUsers } = require('../controllers/getUsers');
const { updateProfile } = require('../controllers/updateProfile');
const { updateAvatar } = require('../controllers/updateAvatar');

users.post('/users', createUser);
users.get('/users', getUsers);
users.get('/users/:userId', getUser);
users.patch('/users/me', updateProfile);
users.patch('/users/me/avatar', updateAvatar);

module.exports = users;