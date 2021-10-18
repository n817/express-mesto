const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
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
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      res.status(200).send({ data: card, message: 'Card deleted' });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(`Error: ${err}`);
      res.status(500).send({ message: 'Error!' });
    });
};

module.exports = { getCards, createCard, deleteCard };
