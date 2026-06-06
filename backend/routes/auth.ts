import express from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validate, schemas } from '../middleware/validate';

const router = express.Router();

router.post('/register', validate(schemas.register), authController.register);
router.post('/login', validate(schemas.login), authController.login);
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, validate(schemas.updateProfile), authController.updateProfile);
router.put('/password', protect, validate(schemas.changePassword), authController.changePassword);

export default router;
