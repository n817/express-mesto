const router = require('express').Router();

const {
  getUsers,
  getUser,
  getMe,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

router.get('/', getUsers); // возвращает всех пользователей
router.get('/:userId', getUser); // возвращает пользователя по _id
router.get('/me', getMe); // возвращает информацию о текущем пользователе
router.patch('/me/avatar', updateAvatar); // обновляет аватар
router.patch('/me', updateProfile); // обновляет профиль

module.exports = router;
