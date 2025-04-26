// src/routes/getDiscountByProductId.js
import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // GET /api/discounts/fromProduct/:productId
    router.get('/fromProduct/:productId', (req, res) => {
        const productId = parseInt(req.params.productId, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        db.query('CALL GetDiscountByProductID(?)', [productId], (err, results) => {
            if (err) {
                console.error('GetDiscountByProductID failed:', err);
                return res.status(500).json({ error: 'GetDiscountByProductID failed' });
            }

            const discount = results[0]?.[0];
            if (!discount) {
                return res.status(404).json({ error: `No discount found for Product ${productId}` });
            }

            res.json(discount);
        });
    });

    return router;
}
