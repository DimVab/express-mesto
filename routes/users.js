const usersRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser, getMyInfo, getUsers, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/me', getMyInfo);
usersRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

usersRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

usersRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp('^https?://(www.)?[a-z0-9-]+\\.[a-z]+[/]*[a-z0-9-._~:/?#[\\]@!$&()*,;=+]*$')),
  }),
}), updateAvatar);

module.exports = usersRoutes;
