import express from 'express';
import * as contactController from '../controllers/contactController';
import { protect, authorize } from '../middleware/auth';
import { validate, schemas } from '../middleware/validate';

const router = express.Router();

router.post('/', validate(schemas.contact), contactController.submitContact);
router.get('/', protect, authorize('contacts.view'), contactController.getContacts);
router.put('/:id', protect, authorize('contacts.update'), contactController.updateContactStatus);
router.delete('/:id', protect, authorize('contacts.delete'), contactController.deleteContact);

export default router;
