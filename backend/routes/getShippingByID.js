// src/routes/getShippingById.js
import express from 'express';
import { authenticateToken } from './authentication.js';

const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // GET /api/shippings/:id
    router.get('/:id', (req, res) => {
        const shippingId = parseInt(req.params.id, 10);
        if (isNaN(shippingId)) {
            return res.status(400).json({ error: 'Invalid Shipping ID' });
        }

        db.query('SELECT * FROM Shipping WHERE Shipping_ID = ?', [shippingId], (err, results) => {
            if (err) {
                console.error('Failed to retrieve shipping:', err);
                return res.status(500).json({ error: 'Failed to retrieve shipping' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Shipping not found' });
            }
            res.json(results[0]);
        });
    });

    return router;
}
