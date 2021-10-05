const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/usersRoutes.js');
const cardsRoutes = require('./routes/cardsRoutes.js');

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

app.use(usersRoutes);
app.use(cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});