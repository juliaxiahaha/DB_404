// src/routes/searchBy.js
import express from 'express';
const router = express.Router();

const isSafeName = v => /^[A-Za-z0-9_]+$/.test(v);

export default function(db) {
    /**
     * GET /api/search
     * ?table=Customer&col=name&val=Alice
     */
    router.get('/', (req, res) => {
        const { table, col, val } = req.query;

        if (!table || !col || !val) {
            return res
                .status(400)
                .json({ error: 'Missing required query params: table, col, val' });
        }
        if (!isSafeName(table) || !isSafeName(col)) {
            return res
                .status(400)
                .json({ error: 'table and col must be alphanumeric or underscore' });
        }

        db.query(
            'CALL searchBy(?, ?, ?)',
            [col, val, table],
            (err, results) => {
                if (err) {
                    console.error('searchBy procedure failed:', err);
                    return res.status(500).json({ error: err.message });
                }
                res.json(results[0]);
            }
        );
    });

    return router;
}
