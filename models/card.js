const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId, /* здесь мб ошибка */
    ref: 'user', /* здесь мб ошибка */
    default: []
  }],
  date: {
    type: Date,
    default: Date.now  /* здесь мб ошибка */
  }
});

module.exports = mongoose.model('card', cardSchema);