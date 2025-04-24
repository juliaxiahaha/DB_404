// src/routes/insertSupplier.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/suppliers/insert
    router.post('/insert', (req, res) => {
        const {
            new_Supplier_ID,
            new_name,
            new_phone,
            new_email
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Supplier_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Supplier ID' });
        }

        const sql = 'CALL InsertSupplier(?, ?, ?, ?)';
        const params = [
            id,         // new_Supplier_ID
            new_name,   // new_name
            new_phone,  // new_phone
            new_email   // new_email
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertSupplier failed:', err);
                return res.status(500).json({ error: 'InsertSupplier failed' });
            }
            res.json({
                message: `Supplier ${id} inserted`,
                results
            });
        });
    });

    return router;
}
