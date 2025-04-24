// src/routes/updateShipping.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/shippings/update
    router.put('/update', (req, res) => {
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

        const sql = 'CALL UpdateShipping(?, ?, ?, ?)';
        const params = [
            id,
            new_shipping_fee,
            new_departure,
            new_destination
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateShipping failed:', err);
                return res.status(500).json({ error: 'UpdateShipping failed' });
            }
            res.json({ message: `Shipping ${id} updated`, results });
        });
    });

    return router;
}
