// src/routes/updateCustomer.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // PUT /api/customers/update
    router.put('/update',  (req, res) => {
        const {
            new_Customer_ID,
            new_name,
            new_address,
            new_phone,
            new_email,
            new_membership_registration_date
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Customer_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Customer ID' });
        }

        const sql = 'CALL UpdateCustomer(?, ?, ?, ?, ?, ?)';
        const params = [
            id,
            new_name,
            new_address,
            new_phone,
            new_email,
            new_membership_registration_date
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateCustomer failed:', err);
                return res.status(500).json({ error: 'UpdateCustomer failed' });
            }
            res.json({
                message: `Customer ${id} updated`,
                results
            });
        });
    });

    return router;
}
