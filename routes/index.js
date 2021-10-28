const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signin', login); // проводит авторизацию пользователя
router.post('/signup', createUser); // создаёт пользователя

router.use(auth); // мидлвэр авторизации (всем роутам ниже потребуется авторизация)
router.use('/users', usersRouter); // localhost:PORT/users + usersRouter
router.use('/cards', cardsRouter); // localhost:PORT/cards + cardsRouter

// обработка запросов на несуществующий роут
router.use((req, res) => res
  .status(404)
  .send({ message: 'Запрошен несуществующий роут' }));

module.exports = router;
