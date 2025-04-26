// src/routes/insertShoppingCart.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/shoppingCarts/insert
    router.post('/insert', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const {
            new_Customer_ID,
            new_Product_ID,
            new_product_quantity
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const custId = parseInt(new_Customer_ID, 10);
        const prodId = parseInt(new_Product_ID,    10);
        const qty    = parseInt(new_product_quantity, 10);

        if (isNaN(custId) || isNaN(prodId) || isNaN(qty)) {
            return res.status(400).json({
                error: 'Invalid Customer ID, Product ID, or Quantity'
            });
        }

        const sql = 'CALL InsertShoppingCart(?, ?, ?)';
        const params = [custId, prodId, qty];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertShoppingCart failed:', err);
                return res.status(500).json({ error: 'InsertShoppingCart failed' });
            }
            res.json({
                message: `ShoppingCart entry (Customer ${custId}, Product ${prodId}) inserted`,
                results
            });
        });
    });

    return router;
}
