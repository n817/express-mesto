const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      next(err);
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res
      .status(200)
      .send({ data: card, message: 'Card deleted' }))
    .catch((err) => {
      next(err);
    });
};

// ставит лайк карточке
const putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res
      .status(200)
      .send({ data: card, message: 'Card like added' }))
    .catch((err) => {
      next(err);
    });
};

// убирает лайк с карточки
const removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res
      .status(200)
      .send({ data: card, message: 'Card like removed' }))
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  removeCardLike,
};
