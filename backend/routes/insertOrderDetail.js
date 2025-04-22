// src/routes/insertOrderDetail.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/orderDetails/insert
    router.post('/insert', (req, res) => {
        const {
            new_Order_ID,
            new_Product_ID,
            new_product_quantity,
            new_order_status
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const orderId   = parseInt(new_Order_ID,   10);
        const productId = parseInt(new_Product_ID, 10);
        const qty       = parseInt(new_product_quantity, 10);

        if (isNaN(orderId) || isNaN(productId) || isNaN(qty)) {
            return res.status(400).json({ error: 'Invalid Order ID, Product ID or Quantity' });
        }

        const sql = 'CALL InsertOrderDetail(?, ?, ?, ?)';
        const params = [
            orderId,
            productId,
            qty,
            new_order_status
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertOrderDetail failed:', err);
                return res.status(500).json({ error: 'InsertOrderDetail failed' });
            }
            res.json({
                message: `OrderDetail (Order ${orderId}, Product ${productId}) inserted`,
                results
            });
        });
    });

    return router;
}
