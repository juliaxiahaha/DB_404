// src/routes/customer.js
import express from 'express';
const router = express.Router();

export default function(db) {
    const toNullable = v => v === undefined || v === '' ? null : v;

    // POST /api/customers/insert
    router.post('/insert', (req, res) => {
        const {
            new_Customer_ID,
            new_name,
            new_contact,
            new_phone,
            new_address,
            new_birthdate
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const customerId = parseInt(new_Customer_ID, 10);
        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid Customer ID' });
        }

        const sql = 'CALL store.InsertCustomer(?, ?, ?, ?, ?, ?)';
        const params = [
            customerId,    // 404
            new_name,      // 'dsc'
            new_contact,   // 'dsc'
            new_phone,     // '234242342'
            new_address,   // 'dsvcds'
            new_birthdate  // '2001-2-2'
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertCustomer failed:', err);
                return res.status(500).json({ error: 'InsertCustomer failed' });
            }
            res.json({
                message: `Customer ${customerId} inserted`,
                results
            });
        });
    });

    return router;
}
