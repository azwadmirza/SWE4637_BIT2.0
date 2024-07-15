import { Router } from 'express';
import {
    register,
    login,
    validateUser,
    getUser,
    resetPassword,
    getUserByEmail,
    updateUserProfile
} from '../controller/authentication.controller';
import authenticated from '../middleware/authentication.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', validateUser);
router.get('/get-user', getUser);
router.post('/reset-password', resetPassword);
router.get('/get-user', getUserByEmail);
router.post('/update',authenticated,updateUserProfile);

export default router;
