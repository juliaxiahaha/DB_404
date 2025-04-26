// src/routes/getCustomers.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // GET /api/customers
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Customer', (err, results) => {
            if (err) {
                console.error('Failed to retrieve customers:', err);
                return res.status(500).json({ error: 'Failed to retrieve customers' });
            }
            res.json(results);
        });
    });

    return router;
}
