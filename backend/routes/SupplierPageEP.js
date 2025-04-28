// src/routes/getSuppliers.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/suppliers
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Supplier', (err, results) => {
            if (err) {
                console.error('Failed to retrieve suppliers:', err);
                return res.status(500).json({ error: 'Failed to retrieve suppliers' });
            }
            res.json(results);
        });
    });

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

    // DELETE /api/suppliers/:id
    router.delete('/:id', (req, res) => {
        const supplierId = parseInt(req.params.id, 10);
        if (isNaN(supplierId)) {
            return res.status(400).json({ error: 'Invalid Supplier ID' });
        }

        db.query('CALL DeleteSupplier(?)', [supplierId], (err, results) => {
            if (err) {
                console.error('DeleteSupplier failed:', err);
                return res.status(500).json({ error: 'DeleteSupplier failed' });
            }
            res.json({
                message: `Supplier ${supplierId} deleted`,
                results
            });
        });
    });

    return router;
}


const toNullable = v => v === undefined || v === '' ? null : v;