// src/routes/getProductReviews.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // GET /api/productReviews
    router.get('/', (req, res) => {
        db.query('SELECT * FROM ProductReview', (err, results) => {
            if (err) {
                console.error('Failed to retrieve product reviews:', err);
                return res.status(500).json({ error: 'Failed to retrieve product reviews' });
            }
            res.json(results);
        });
    });

    return router;
}
