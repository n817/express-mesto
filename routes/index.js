const router = require('express').Router();
const userRouter = require('./users');

router.use('/users', userRouter); // localhost:PORT/users + userRouter

module.exports = router;
