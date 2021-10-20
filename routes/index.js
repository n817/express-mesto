const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter); // localhost:PORT/users + usersRouter
router.use('/cards', cardsRouter); // localhost:PORT/cards + cardsRouter

// обработка запросов на несуществующий роут
router.use((req, res) => res
  .status(404)
  .send({ message: 'Запрошен несуществующий роут' }));

module.exports = router;
