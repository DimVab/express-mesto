const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes.js');
const cardsRoutes = require('./routes/cardsRoutes.js');
const { createUser, login } = require('./controllers/users');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(usersRoutes);
app.use(cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});