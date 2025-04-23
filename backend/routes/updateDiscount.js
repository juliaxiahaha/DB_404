// src/routes/updateDiscount.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/discounts/update
    router.put('/update', (req, res) => {
        const {
            new_Discount_ID,
            new_discount_type,
            new_discount_value,
            new_start_date,
            new_end_date
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Discount_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Discount ID' });
        }

        const sql = 'CALL UpdateDiscount(?, ?, ?, ?, ?)';
        const params = [
            id,
            new_discount_type,
            new_discount_value,
            new_start_date,
            new_end_date
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateDiscount failed:', err);
                return res.status(500).json({ error: 'UpdateDiscount failed' });
            }
            res.json({ message: `Discount ${id} updated`, results });
        });
    });

    return router;
}
