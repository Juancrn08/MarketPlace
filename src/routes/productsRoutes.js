
// src/routes/productRoutes.js
import express from 'express';
const router = express.Router();

// Rutas de productos placeholder
router.get('/', (req, res) => {
    res.json({ message: 'Get all products' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get product by ID' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Create product' });
});

router.put('/:id', (req, res) => {
    res.json({ message: 'Update product' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete product' });
});

export default router;