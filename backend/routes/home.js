// routes/home.js
import express from 'express';

const router = express.Router();

export default function(db) {
    // Call InsertProduct procedure
    router.post('/insert', (req, res) => {
        const toNullable = (value) => {
            return value === undefined || value === '' ? null : value;
        };

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
            Object.entries(req.body).map(([key, value]) => [key, toNullable(value)])
        );

        const sql = `CALL InsertProduct(?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            new_Product_ID,
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
                console.error('InsertProduct procedure failed:', err);
                return res.status(500).json({ error: 'InsertProduct failed' });
            }
            res.json({ message: 'Product inserted successfully', results });
        });
    });

    return router;
}