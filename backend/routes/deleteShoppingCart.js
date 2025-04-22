// src/routes/deleteShoppingCart.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // DELETE /api/shoppingCarts/:customerId/:productId
    router.delete('/:customerId/:productId', (req, res) => {
        const custId    = parseInt(req.params.customerId, 10);
        const productId = parseInt(req.params.productId,  10);

        if (isNaN(custId) || isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Customer ID or Product ID' });
        }

        db.query(
            'CALL DeleteShoppingCart(?, ?)',
            [custId, productId],
            (err, results) => {
                if (err) {
                    console.error('DeleteShoppingCart failed:', err);
                    return res.status(500).json({ error: 'DeleteShoppingCart failed' });
                }
                res.json({
                    message: `ShoppingCart entry (Customer ${custId}, Product ${productId}) deleted`,
                    results
                });
            }
        );
    });

    return router;
}
