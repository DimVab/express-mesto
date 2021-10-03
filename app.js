const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '615964afb6d4ab8104d5bb3e'
  };

  next();
});

app.use(users);
app.use(cards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});