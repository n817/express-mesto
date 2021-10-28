const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// проводит аутентификацию пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // успешная аутентификация, пользователь в переменной user
      // создадим и вернем токен
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .send({ token, id: user._id });
    })
    .catch(next); // эквивалентна catch(err => next(err))
};

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
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Невалидный id пользователя' });
        return;
      }
      next(err);
    });
};

const getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((userData) => {
      if (userData) {
        res.status(200).send(userData);
      }
      res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Невалидный id пользователя' });
        return;
      }
      next(err);
    });
};

// создаёт пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ ...req.body, password: hash }))
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
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }, // then получит обновлённые данные + валидация данных
  )
    .orFail(() => {
      const error = new Error('не найден пользователь по заданному id');
      error.statusCode = 404;
      throw error;
    })
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
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }, // then получит обновлённые данные + валидация данных
  )
    .orFail(() => {
      const error = new Error('не найден пользователь по заданному id');
      error.statusCode = 404;
      throw error;
    })
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
  login,
  getUsers,
  getUser,
  getMe,
  createUser,
  updateAvatar,
  updateProfile,
};
