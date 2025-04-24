// src/routes/getShippings.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/shippings
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Shipping', (err, results) => {
            if (err) {
                console.error('Failed to retrieve shipping records:', err);
                return res.status(500).json({ error: 'Failed to retrieve shipping records' });
            }
            res.json(results);
        });
    });

    return router;
}
