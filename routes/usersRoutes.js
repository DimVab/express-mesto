const usersRoutes = require('express').Router();

const { getUser, getMyInfo, getUsers, updateProfile, updateAvatar } = require('../controllers/users');

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/me', getMyInfo);
usersRoutes.get('/users/:userId', getUser);
usersRoutes.patch('/users/me', updateProfile);
usersRoutes.patch('/users/me/avatar', updateAvatar);

module.exports = usersRoutes;