// src/routes/deleteOrderDetail.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // DELETE /api/orderDetails/:orderId/:productId
    router.delete('/:orderId/:productId', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const orderId   = parseInt(req.params.orderId,   10);
        const productId = parseInt(req.params.productId, 10);

        if (isNaN(orderId) || isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Order ID or Product ID' });
        }

        db.query(
            'CALL DeleteOrderDetail(?, ?)',
            [orderId, productId],
            (err, results) => {
                if (err) {
                    console.error('DeleteOrderDetail failed:', err);
                    return res.status(500).json({ error: 'DeleteOrderDetail failed' });
                }
                res.json({
                    message: `OrderDetail (Order ${orderId}, Product ${productId}) deleted`,
                    results
                });
            }
        );
    });

    return router;
}
