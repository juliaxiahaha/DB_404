// src/routes/getSuppliers.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // GET /api/suppliers
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Supplier', (err, results) => {
            if (err) {
                console.error('Failed to retrieve suppliers:', err);
                return res.status(500).json({ error: 'Failed to retrieve suppliers' });
            }
            res.json(results);
        });
    });

    return router;
}
