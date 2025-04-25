// src/routes/deleteSupplier.js
import express from 'express';
const router = express.Router();

export default function(db) {
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
