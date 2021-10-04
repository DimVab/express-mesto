const Card = require('../models/card');

module.exports.createCard = (req, res) => {

  const { name, link } = req.body;
  if ( !link.includes("https//:") && !link.includes("http//:")) {
    return  res.status(400).send({ message: `Передан некорректный адрес` });
  }
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(user => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Переданы некорректные данные в методы создания карточки` });
      }
      console.log('Error:' + err);
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};