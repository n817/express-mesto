const router = require('express').Router();

const {
  login,
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.post('/signin', login); // проводит авторизацию пользователя
router.post('/signup', createUser); // создаёт пользователя
router.get('/', getUsers); // возвращает всех пользователей
router.get('/:userId', getUser); // возвращает пользователя по _id
router.patch('/me/avatar', updateAvatar); // обновляет аватар
router.patch('/me', updateProfile); // обновляет профиль

module.exports = router;
