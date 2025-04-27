// src/routes/insertOrderDetail.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

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

        const orderId   = parseInt(new_Order_ID, 10);
        const productId = parseInt(new_Product_ID, 10);
        const qty       = parseInt(new_product_quantity, 10);

        if (isNaN(orderId) || isNaN(productId) || isNaN(qty)) {
            return res.status(400).json({ error: 'Invalid Order ID, Product ID or Quantity' });
        }

        const selectSql = 'SELECT * FROM OrderDetail WHERE Order_ID = ? AND Product_ID = ?';
        db.query(selectSql, [orderId, productId], (err, results) => {
            if (err) {
                console.error('Select OrderDetail failed:', err);
                return res.status(500).json({ error: 'Select OrderDetail failed' });
            }

            if (results.length > 0) {
                const updateSql = 'UPDATE OrderDetail SET product_quantity = product_quantity + ? WHERE Order_ID = ? AND Product_ID = ?';
                db.query(updateSql, [qty, orderId, productId], (err2) => {
                    if (err2) {
                        console.error('Update OrderDetail failed:', err2);
                        return res.status(500).json({ error: 'Update OrderDetail failed' });
                    }
                    res.json({ message: `OrderDetail updated: quantity +${qty}` });
                });
            } else {
                const insertSql = 'CALL InsertOrderDetail(?, ?, ?, ?)';
                const params = [orderId, productId, qty, new_order_status];

                db.query(insertSql, params, (err3, results3) => {
                    if (err3) {
                        console.error('InsertOrderDetail failed:', err3);
                        return res.status(500).json({ error: 'InsertOrderDetail failed' });
                    }
                    res.json({
                        message: `OrderDetail (Order ${orderId}, Product ${productId}) inserted`,
                        results: results3
                    });
                });
            }
        });
    });

    return router;
}
