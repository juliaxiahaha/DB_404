// src/routes/getShoppingCarts.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // GET /api/shoppingCarts
    router.get('/', (req, res) => {
        db.query('SELECT * FROM ShoppingCart', (err, results) => {
            if (err) {
                console.error('Failed to retrieve shopping cart records:', err);
                return res.status(500).json({ error: 'Failed to retrieve shopping cart records' });
            }
            res.json(results);
        });
    });

    return router;
}
