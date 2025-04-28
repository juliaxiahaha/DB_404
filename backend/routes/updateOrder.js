// src/routes/updateOrder.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/orders/update
    router.put('/update',  (req, res) => {
        const {
            new_Order_ID,
            new_order_date,
            new_Customer_ID,
            new_Employee_ID,
            new_Shipping_ID
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Order_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Order ID' });
        }

        const selectSql = 'SELECT total_price FROM Orders WHERE Order_ID = ?';
        db.query(selectSql, [id], (selectErr, selectResults) => {
            if (selectErr) {
                console.error('Failed to fetch total_price:', selectErr);
                return res.status(500).json({ error: 'Failed to fetch total_price' });
            }
            if (selectResults.length === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }

            const new_total_price = selectResults[0].total_price;

            const sql = 'CALL UpdateOrder(?, ?, ?, ?, ?, ?)';
            const params = [
                id,
                new_order_date,
                new_total_price,
                new_Customer_ID,
                new_Employee_ID,
                new_Shipping_ID
            ];

            db.query(sql, params, (err, results) => {
                if (err) {
                    console.error('UpdateOrder failed:', err);
                    return res.status(500).json({ error: 'UpdateOrder failed' });
                }
                res.json({ message: `Order ${id} updated`, results });
            });
        });
    });

    return router;
}
