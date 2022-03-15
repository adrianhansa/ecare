const router = require('express').Router();
const {
  addDiaryEntry,
  updateDiaryEntry,
  getDiaryEntry,
  getDiaryEntries,
  deleteDiaryEntry,
  toggleCompleteDiaryEntry,
} = require('../controllers/diaryController');
const { rcw } = require('../middlewares/auth');
const service = require('../middlewares/service');

router.post('/:service', rcw, service, addDiaryEntry);
router.get('/:service', rcw, service, getDiaryEntries);
router.get('/:id', rcw, getDiaryEntry);
router.put('/:id', rcw, updateDiaryEntry);
router.delete('/:id', rcw, deleteDiaryEntry);
router.put('/toggle-complete-diary-entry/:id', rcw, toggleCompleteDiaryEntry);

module.exports = router;
