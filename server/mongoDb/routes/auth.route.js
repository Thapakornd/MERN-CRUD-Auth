import {
    authLogin,
    handleRefreshToken,
    loggedOut,
    createUser
} from '../controllers/authen.controller.js';
import express from 'express';

const router = express.Router();

router.post('/register', createUser);
router.post('/auth', authLogin);
router.get('/refresh', handleRefreshToken);
router.get('/logout', loggedOut);

export default router;