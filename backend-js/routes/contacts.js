const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getContacts, 
  getContact,
  updateContactStatus, 
  deleteContact 
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Public route
router.post('/', validate(schemas.contact), submitContact);

// Protected routes
router.get('/', protect, authorize('contacts.*'), getContacts);
router.get('/:id', protect, authorize('contacts.*'), getContact);
router.put('/:id/status', protect, authorize('contacts.*'), updateContactStatus);
router.delete('/:id', protect, authorize('contacts.*'), deleteContact);

module.exports = router;