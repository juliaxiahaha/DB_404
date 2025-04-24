// src/routes/updateOrderDetail.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/orderDetails/update
    router.put('/update', (req, res) => {
        const {
            new_Order_ID,
            new_Product_ID,
            new_product_quantity,
            new_order_status
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const orderId   = parseInt(new_Order_ID, 10);
        const productId = parseInt(new_Product_ID, 10);
        const quantity  = parseInt(new_product_quantity, 10);

        if (isNaN(orderId) || isNaN(productId) || isNaN(quantity)) {
            return res.status(400).json({ error: 'Invalid Order ID, Product ID or Quantity' });
        }

        const sql = 'CALL UpdateOrderDetail(?, ?, ?, ?)';
        const params = [orderId, productId, quantity, new_order_status];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateOrderDetail failed:', err);
                return res.status(500).json({ error: 'UpdateOrderDetail failed' });
            }
            res.json({
                message: `OrderDetail (Order ${orderId}, Product ${productId}) updated`,
                results
            });
        });
    });

    return router;
}
