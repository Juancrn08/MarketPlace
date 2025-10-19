import express from 'express';
const router = express.Router();

// Rutas de órdenes placeholder
router.get('/', (req, res) => {
    res.json({ message: 'Get all orders' });
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Get order by ID' });
});

router.post('/', (req, res) => {
    res.json({ message: 'Create order' });
});

router.put('/:id', (req, res) => {
    res.json({ message: 'Update order' });
});

router.delete('/:id', (req, res) => {
    res.json({ message: 'Cancel order' });
});

export default router;