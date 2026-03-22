import express from 'express';
import { handleSignUp, handleSignIn, handleSignOut } from '../controllers/auth.controller.js';

const router = express.Router();
router.post('/sign-up', handleSignUp);
router.post('/sign-in', handleSignIn);
router.get('/sign-out', handleSignOut);

export default router;