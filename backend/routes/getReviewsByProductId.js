// src/routes/getReviewsByProductId.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/productReviews/byProduct/:productId
    router.get('/byProduct/:productId', (req, res) => {
        const productId = parseInt(req.params.productId, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        db.query('CALL getReviewsByPID(?)', [productId], (err, results) => {
            if (err) {
                console.error('getReviewsByPID failed:', err);
                return res.status(500).json({ error: 'getReviewsByPID failed' });
            }

            const reviews = results[0];
            res.json(reviews);
        });
    });

    return router;
}
