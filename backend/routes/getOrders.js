// src/routes/getOrders.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // GET /api/orders
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Orders', (err, results) => {
            if (err) {
                console.error('Failed to retrieve orders:', err);
                return res.status(500).json({ error: 'Failed to retrieve orders' });
            }
            res.json(results);
        });
    });

    return router;
}
