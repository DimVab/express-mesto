const usersRoutes = require('express').Router();

const { createUser, getUser, getUsers, updateProfile, updateAvatar } = require('../controllers/users');

usersRoutes.post('/users', createUser);
usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/:userId', getUser);
usersRoutes.patch('/users/me', updateProfile);
usersRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = usersRoutes;