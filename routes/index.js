const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

// проводит авторизацию пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// создаёт пользователя
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.use(auth); // мидлвэр авторизации (всем роутам ниже потребуется авторизация)

router.use('/users', usersRouter); // localhost:PORT/users + usersRouter
router.use('/cards', cardsRouter); // localhost:PORT/cards + cardsRouter

router.use(errors());// обработчик ошибок celebrate

// обработка запросов на несуществующий роут
router.use((req, res) => res
  .status(404)
  .send({ message: 'Запрошен несуществующий роут' }));

module.exports = router;
