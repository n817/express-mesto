const Card = require('../models/card');

const getCards = (req, res) => {
  // Здесь будет функционал возврата всех карточек
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
};

const deleteCard = (req, res) => {
  // Здесь будет функционал удаления карточки
};

module.exports = { getCards, createCard, deleteCard };
