// src/routes/customer.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    const toNullable = v => v === undefined || v === '' ? null : v;

    router.post('/insert', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const {
            new_Customer_ID,
            new_name,
            new_address,
            new_phone,
            new_email,
            new_registration_date,
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
            new_address,   // 'dsvcds'
            new_phone,     // '234242342'
            new_email,
            new_registration_date,
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
