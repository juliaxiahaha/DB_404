// src/routes/getCustomers.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/customers
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Customer', (err, results) => {
            if (err) {
                console.error('Failed to retrieve customers:', err);
                return res.status(500).json({ error: 'Failed to retrieve customers' });
            }
            res.json(results);
        });
    });

    const toNullable = v => v === undefined || v === '' ? null : v;

    router.post('/insert', (req, res) => {
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

    router.delete('/:id', (req, res) => {
        const victimId = parseInt(req.params.id, 10);
        if (isNaN(victimId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        db.query('CALL DeleteCustomer(?)', [victimId], (err, results) => {
            if (err) {
                console.error('DeleteCustomer failed：', err);
                return res.status(500).json({ error: 'DeleteCustomer failed' });
            }
            res.json({ message: `Customer ${victimId} deleted`, results });
        });
    });

    return router;
}
