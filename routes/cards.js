const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards); // возвращает все карточки
router.post('/', createCard); // создаёт карточку
router.delete('/:cardId', deleteCard); // удаляет карточку по идентификатору
router.put('/:cardId/likes', putCardLike); // ставит лайк карточке
router.delete('/:cardId/likes', removeCardLike); // убирает лайк с карточки

module.exports = router;
