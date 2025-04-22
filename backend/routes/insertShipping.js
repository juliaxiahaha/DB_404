// src/routes/insertShipping.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/shippings/insert
    router.post('/insert', (req, res) => {
        const {
            new_Shipping_ID,
            new_shipping_fee,
            new_departure,
            new_destination
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Shipping_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Shipping ID' });
        }

        const sql = 'CALL InsertShipping(?, ?, ?, ?)';
        const params = [
            id,                 // new_Shipping_ID
            new_shipping_fee,   // new_shipping_fee
            new_departure,      // new_departure
            new_destination     // new_destination
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertShipping failed:', err);
                return res.status(500).json({ error: 'InsertShipping failed' });
            }
            res.json({
                message: `Shipping ${id} inserted`,
                results
            });
        });
    });

    return router;
}
