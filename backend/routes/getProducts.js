// src/routes/getProducts.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/products
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Product', (err, results) => {
            if (err) {
                console.error('Failed to retrieve products:', err);
                return res.status(500).json({ error: 'Failed to retrieve products' });
            }
            res.json(results);
        });
    });

    return router;
}
