const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
});

app.use(express.json());

app.use(users);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});