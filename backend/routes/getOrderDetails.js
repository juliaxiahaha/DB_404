// src/routes/getOrderDetails.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/orderDetails
    router.get('/', (req, res) => {
        db.query('SELECT * FROM OrderDetail', (err, results) => {
            if (err) {
                console.error('Failed to retrieve order details:', err);
                return res.status(500).json({ error: 'Failed to retrieve order details' });
            }
            res.json(results);
        });
    });

    return router;
}
