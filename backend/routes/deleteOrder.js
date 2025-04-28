// src/routes/deleteOrder.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // DELETE /api/orders/:id
    router.delete('/:id',(req, res) => {
        const orderId = parseInt(req.params.id, 10);
        if (isNaN(orderId)) {
            return res.status(400).json({ error: 'Invalid Order ID' });
        }

        db.query('CALL DeleteOrder(?)', [orderId], (err, results) => {
            if (err) {
                console.error('DeleteOrder failed:', err);
                return res.status(500).json({ error: 'DeleteOrder failed' });
            }
            res.json({ message: `Order ${orderId} deleted`, results });
        });
    });

    return router;
}
