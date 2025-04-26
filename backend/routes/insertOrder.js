// src/routes/insertOrder.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/orders/insert
    router.post('/insert', (req, res) => {
        const {
            new_Order_ID,
            new_order_date,
            new_total_price,
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

        const sql = 'CALL InsertOrder(?, ?, ?, ?, ?, ?)';
        const params = [
            id,                   // new_Order_ID
            new_order_date,       // new_order_date
            new_total_price,      // new_total_price
            new_Customer_ID,      // new_Customer_ID
            new_Employee_ID,      // new_Employee_ID
            new_Shipping_ID       // new_Shipping_ID
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertOrder failed:', err);
                return res.status(500).json({ error: 'InsertOrder failed' });
            }
            res.json({
                message: `Order ${id} inserted`,
                results
            });
        });
        console.log('Received POST /api/orders/insert with body:', req.body);
    });

    return router;
}
