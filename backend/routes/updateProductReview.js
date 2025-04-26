// src/routes/updateProductReview.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/productReviews/update
    router.put('/update', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const {
            new_Review_ID,
            new_rating,
            new_comment,
            new_review_date,
            new_Customer_ID,
            new_Product_ID
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const reviewId   = parseInt(new_Review_ID, 10);
        const customerId = parseInt(new_Customer_ID, 10);
        const productId  = parseInt(new_Product_ID, 10);

        if (isNaN(reviewId) || isNaN(customerId) || isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Review ID, Customer ID or Product ID' });
        }

        const sql = 'CALL UpdateProductReview(?, ?, ?, ?, ?, ?)';
        const params = [
            reviewId,
            new_rating,
            new_comment,
            new_review_date,
            customerId,
            productId
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateProductReview failed:', err);
                return res.status(500).json({ error: 'UpdateProductReview failed' });
            }
            res.json({
                message: `ProductReview ${reviewId} updated`,
                results
            });
        });
    });

    return router;
}
