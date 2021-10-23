const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, getMyInfo, getUsers, updateProfile, updateAvatar } = require('../controllers/users');

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/me', getMyInfo);
usersRoutes.get('/users/:userId', getUser);

usersRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  }),
}), updateProfile);

usersRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
  }),
}), updateAvatar);

module.exports = usersRoutes;