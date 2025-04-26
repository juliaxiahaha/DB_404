// src/routes/getProductById.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // GET /api/products/:id
    router.get('/:id', (req, res) => {
        const productId = parseInt(req.params.id, 10);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        db.query('SELECT * FROM Product WHERE Product_ID = ?', [productId], (err, results) => {
            if (err) {
                console.error('Failed to retrieve product:', err);
                return res.status(500).json({ error: 'Failed to retrieve product' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: `Product ${productId} not found` });
            }
            res.json(results[0]);
        });
    });

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

    router.get('/asProduct/:productId', (req, res) => {
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
