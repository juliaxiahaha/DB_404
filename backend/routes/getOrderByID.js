// src/routes/getOrderById.js
import express from 'express';
import { authenticateToken } from './authentication.js';

const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // GET /api/orders/:id
    router.get('/:id', (req, res) => {
        const orderId = parseInt(req.params.id, 10);
        if (isNaN(orderId)) {
            return res.status(400).json({ error: 'Invalid Order ID' });
        }

        db.query('SELECT * FROM Orders WHERE Order_ID = ?', [orderId], (err, results) => {
            if (err) {
                console.error('Failed to retrieve order:', err);
                return res.status(500).json({ error: 'Failed to retrieve order' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json(results[0]);
        });
    });

    return router;
}
