// src/routes/deleteProduct.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
    // DELETE /api/products/:id
    router.delete('/:id',  (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        db.query('CALL DeleteProduct(?)', [productId], (err, results) => {
            if (err) {
                console.error('DeleteProduct failed:', err);
                return res.status(500).json({ error: 'DeleteProduct failed' });
            }

            res.json({ message: `Product ${productId} deleted`, results });
        });
    });

    return router;
}
