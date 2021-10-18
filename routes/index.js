const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter); // localhost:PORT/users + usersRouter
router.use('/cards', cardsRouter); // localhost:PORT/cards + cardsRouter

module.exports = router;
