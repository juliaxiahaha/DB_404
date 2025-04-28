// src/routes/getProducts.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // GET /api/products
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Product', (err, results) => {
            if (err) {
                console.error('Failed to retrieve products:', err);
                return res.status(500).json({ error: 'Failed to retrieve products' });
            }
            res.json(results);
        });
    });

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

    router.delete('/:id', (req, res) => {
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
