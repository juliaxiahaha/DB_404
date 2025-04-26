// src/routes/getProductById.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // GET /api/products/:id
    router.get('/:id', (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        db.query('SELECT * FROM Product WHERE Product_ID = ?', [productId], (err, results) => {
            if (err) {
                console.error('Failed to retrieve product:', err);
                return res.status(500).json({ error: 'Failed to retrieve product' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: `Product ${productId} not found` });
            }
            res.json(results[0]);
        });
    });

    return router;
}
