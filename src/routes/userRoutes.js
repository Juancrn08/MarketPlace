// src/routes/userRoutes.js
import express from 'express';
const router = express.Router();

// Rutas de usuarios placeholder
router.get('/profile', (req, res) => {
    res.json({ message: 'User profile' });
});

router.put('/profile', (req, res) => {
    res.json({ message: 'Update profile' });
});

export default router;