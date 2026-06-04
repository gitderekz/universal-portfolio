const express = require('express');
const router = express.Router();
const { 
  getTeamMembers, 
  getTeamMember, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember 
} = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMember);

// Protected routes
router.post('/', protect, authorize('teams.*'), createTeamMember);
router.put('/:id', protect, authorize('teams.*'), updateTeamMember);
router.delete('/:id', protect, authorize('teams.*'), deleteTeamMember);

module.exports = router;