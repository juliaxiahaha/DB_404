// src/routes/updateProduct.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/products/update
    router.put('/update', (req, res) => {
        const {
            new_Product_ID,
            new_name,
            new_category,
            new_retail_price,
            new_purchasing_price,
            new_ratings,
            new_Supplier_ID,
            new_Discount_ID
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Product_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        const sql = 'CALL UpdateProduct(?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [
            id,
            new_name,
            new_category,
            new_retail_price,
            new_purchasing_price,
            new_ratings,
            new_Supplier_ID,
            new_Discount_ID
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateProduct failed:', err);
                return res.status(500).json({ error: 'UpdateProduct failed' });
            }
            res.json({ message: `Product ${id} updated`, results });
        });
    });

    return router;
}
