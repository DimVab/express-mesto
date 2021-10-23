const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes.js');
const cardsRoutes = require('./routes/cardsRoutes.js');
const { createUser, login } = require('./controllers/users');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
  }),
}), createUser);

app.use(auth);

app.use(usersRoutes);
app.use(cardsRoutes);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({message: statusCode === 500 ? 'На сервере произошла ошибка' : message});
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});