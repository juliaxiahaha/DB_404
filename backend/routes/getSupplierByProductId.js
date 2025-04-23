// src/routes/getSupplierByProductId.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/suppliers/fromProduct/:productId
    router.get('/fromProduct/:productId', (req, res) => {
        const productId = parseInt(req.params.productId, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        const sql = 'CALL getSupplierByPID(?)';

        db.query(sql, [productId], (err, results) => {
            if (err) {
                console.error('getSupplierByPID failed:', err);
                return res.status(500).json({ error: 'getSupplierByPID failed' });
            }
            const supplier = results[0]?.[0];
            if (!supplier) {
                return res.status(404).json({ error: `No supplier found for Product ${productId}` });
            }
            res.json(supplier);
        });
    });

    return router;
}
