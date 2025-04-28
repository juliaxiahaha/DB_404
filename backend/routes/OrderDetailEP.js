// src/routes/getOneOrder.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function (db) {
    // GET /api/orderDetails/:id
    router.get('/:id', (req, res) => {
        const orderId = req.params.id;

        db.query(
            'SELECT * FROM OrderDetailPage WHERE Order_ID = ?',
            [orderId],
            (err, results) => {
                if (err) {
                    console.error('Failed to retrieve order detail:', err);
                    return res.status(500).json({ error: 'Failed to retrieve order detail' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'No details found for this Order ID' });
                }

                res.json(results);
            }
        );
    });

    return router;
}
