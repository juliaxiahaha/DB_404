// src/routes/insertProduct.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/products/insert
    router.post('/insert', (req, res) => {
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

        const sql = 'CALL InsertProduct(?, ?, ?, ?, ?, ?, ?, ?)';
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
                console.error('InsertProduct failed:', err);
                return res.status(500).json({ error: 'InsertProduct failed' });
            }
            res.json({
                message: `Product ${id} inserted`,
                results
            });
        });
    });

    return router;
}
