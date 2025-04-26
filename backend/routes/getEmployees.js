// src/routes/getEmployees.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // GET /api/employees
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Employee', (err, results) => {
            if (err) {
                console.error('Failed to retrieve employees:', err);
                return res.status(500).json({ error: 'Failed to retrieve employees' });
            }
            res.json(results);
        });
    });

    return router;
}
