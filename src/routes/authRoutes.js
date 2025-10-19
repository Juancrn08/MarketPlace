
// src/routes/authRoutes.js
import express from 'express';
const router = express.Router();

// Rutas de autenticación placeholder
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint' });
});

router.post('/login', (req, res) => {
    res.json({ message: 'Login endpoint' });
});

router.post('/logout', (req, res) => {
    res.json({ message: 'Logout endpoint' });
});

export default router;
