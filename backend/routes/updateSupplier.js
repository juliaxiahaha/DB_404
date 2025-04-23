// src/routes/updateSupplier.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/suppliers/update
    router.put('/update', (req, res) => {
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

        const sql = 'CALL UpdateSupplier(?, ?, ?, ?)';
        const params = [id, new_name, new_phone, new_email];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateSupplier failed:', err);
                return res.status(500).json({ error: 'UpdateSupplier failed' });
            }
            res.json({ message: `Supplier ${id} updated`, results });
        });
    });

    return router;
}
