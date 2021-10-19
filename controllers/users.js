const User = require('../models/user');

// возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((usersData) => res.status(200).send(usersData))
    .catch((err) => {
      next(err);
    });
};

// возвращает пользователя по _id
const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((userData) => {
      if (userData) {
        res.status(200).send(userData);
        return;
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      next(err);
    });
};

// создаёт пользователя
const createUser = (req, res, next) => {
  User.create({ ...req.body })
    .then((userData) => res.status(200).send(userData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `При создании пользователя переданы некорректные данные: ${err.message}` });
        return;
      }
      next(err);
    });
};

// обновляет аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((userData) => res.status(200).send(userData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `При обновлении аватара переданы некорректные данные: ${err.message}` });
        return;
      }
      next(err);
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((userData) => res.status(200).send(userData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `При обновлении профиля переданы некорректные данные: ${err.message}` });
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
};
