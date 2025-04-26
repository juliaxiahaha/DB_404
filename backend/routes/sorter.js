// src/routes/sorter.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    /**
     * GET /api/sorter?tbl=enrollment&col=grade&op=ASC
     */
    router.get('/', (req, res) => {
        const { tbl, col, op } = req.query;

        if (!tbl || !col || !op) {
            return res
                .status(400)
                .json({ error: 'Missing required query params: tbl, col, op' });
        }

        const direction = op.toUpperCase();
        if (direction !== 'ASC' && direction !== 'DESC') {
            return res
                .status(400)
                .json({ error: 'Invalid op, must be ASC or DESC' });
        }

        db.query('CALL sorter(?, ?, ?)', [tbl, col, direction], (err, results) => {
            if (err) {
                console.error('sorter procedure failed:', err);
                return res.status(500).json({ error: err.message });
            }
            res.json(results[0]);
        });
    });

    return router;
}
