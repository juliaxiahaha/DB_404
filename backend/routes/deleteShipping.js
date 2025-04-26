// src/routes/deleteShipping.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // DELETE /api/shippings/:id
    router.delete('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const shipId = parseInt(req.params.id, 10);
        if (isNaN(shipId)) {
            return res.status(400).json({ error: 'Invalid Shipping ID' });
        }

        db.query('CALL DeleteShipping(?)', [shipId], (err, results) => {
            if (err) {
                console.error('DeleteShipping failed:', err);
                return res.status(500).json({ error: 'DeleteShipping failed' });
            }
            res.json({ message: `Shipping ${shipId} deleted`, results });
        });
    });

    return router;
}
