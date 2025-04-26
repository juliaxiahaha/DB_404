// src/routes/updateShoppingCart.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/shoppingCarts/update
    router.put('/update', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const {
            new_Customer_ID,
            new_Product_ID,
            new_product_quantity
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const custId    = parseInt(new_Customer_ID, 10);
        const productId = parseInt(new_Product_ID, 10);
        const quantity  = parseInt(new_product_quantity, 10);

        if (isNaN(custId) || isNaN(productId) || isNaN(quantity)) {
            return res.status(400).json({ error: 'Invalid Customer ID, Product ID, or Quantity' });
        }

        const sql = 'CALL UpdateShoppingCart(?, ?, ?)';
        const params = [custId, productId, quantity];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateShoppingCart failed:', err);
                return res.status(500).json({ error: 'UpdateShoppingCart failed' });
            }
            res.json({
                message: `ShoppingCart (Customer ${custId}, Product ${productId}) updated`,
                results
            });
        });
    });

    return router;
}
