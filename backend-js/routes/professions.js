const express = require('express');
const router = express.Router();
const { 
  getProfessions, 
  getProfession, 
  getProfessionBySlug, 
  createProfession, 
  updateProfession, 
  deleteProfession 
} = require('../controllers/professionController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getProfessions);
router.get('/slug/:slug', getProfessionBySlug);
router.get('/:id', getProfession);

// Protected routes
router.post('/', protect, authorize('professions.*'), createProfession);
router.put('/:id', protect, authorize('professions.*'), updateProfession);
router.delete('/:id', protect, authorize('professions.*'), deleteProfession);

module.exports = router;