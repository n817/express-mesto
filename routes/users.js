const router = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers); // возвращает всех пользователей
router.get('/:userId', getUser); // возвращает пользователя по _id
router.post('/', createUser); // создаёт пользователя
router.patch('/me/avatar', updateAvatar); // обновляет аватар
router.patch('/me', updateProfile); // обновляет профиль

module.exports = router;
