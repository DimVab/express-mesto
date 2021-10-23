const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const usersRoutes = require('./routes/usersRoutes.js');
const cardsRoutes = require('./routes/cardsRoutes.js');
const { NotFoundError } = require('./errors/errors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp('^https?:\/\/(www.)?[a-z0-9\-]+\\.[a-z]+[\/]*[a-z0-9\-._~:/?#[\\]@!$&()*,;=+]*$'))
    // почему-то Joi не видит точку как знак перпинания, если её экранировать одним слешем (/.)
  })
}), createUser);

app.use(auth);

app.use(usersRoutes);
app.use(cardsRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
 });

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(err.name);
  console.log(err.status);

  res
    .status(statusCode)
    .send({message: statusCode === 500 ? 'На сервере произошла ошибка' : message});
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});