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
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `При создании карточки переданы некорректные данные: ${err.message}` });
        return;
      }
      next(err);
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('не найдена карточка по заданному id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        const error = new Error('запрещено удалять карточки других пользователей');
        error.statusCode = 403;
        throw error;
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then((data) => res
            .status(200)
            .send({ data, message: 'Карточка удалена' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Невалидный id карточки' });
        return;
      }
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
    .orFail(() => {
      const error = new Error('Не найдена карточка по заданному id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res
      .status(200)
      .send({ data: card, message: 'Лайк поставлен' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Невалидный id карточки' });
        return;
      }
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
    .orFail(() => {
      const error = new Error('не найдена карточка по заданному id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res
      .status(200)
      .send({ data: card, message: 'Лайк убран' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Невалидный id карточки' });
        return;
      }
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
